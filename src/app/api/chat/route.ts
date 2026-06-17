import Anthropic from "@anthropic-ai/sdk";
import { createSupabaseClient } from "@/lib/supabase";
import { sendAdminNotification } from "@/lib/email";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant for Phase One Coaching, a business consulting firm that helps aspiring entrepreneurs and early-stage founders build businesses that actually work.

Your role is to answer questions about Phase One Coaching's services, help visitors understand if coaching is right for them, and encourage them to take the next step (booking a free consultation).

Key facts about Phase One Coaching:
- We work with people who are at the idea stage, pre-revenue, or early revenue (Phase 1 founders)
- Services include 1-on-1 business strategy consulting, accountability coaching, and structured launch frameworks
- Free consultation available to assess fit and create a game plan
- We focus on avoiding common money traps, building real revenue models, and setting up systems for growth
- The founder can be reached at phaseonecoach.com

Guidelines:
- Be warm, encouraging, and direct — not salesy
- Answer questions honestly; if something is outside our services, say so
- If someone seems stuck or frustrated, empathize and ask what their biggest challenge is
- Nudge toward booking a free consultation when appropriate, but don't push it every message
- Keep responses concise — 2-4 sentences unless the question genuinely needs more
- Do not make up specific pricing, timelines, or guarantees you don't know`;

export async function POST(req: Request) {
  const { messages, sessionToken } = await req.json();

  if (!messages || !sessionToken) {
    return new Response("Missing messages or sessionToken", { status: 400 });
  }

  const supabase = createSupabaseClient();

  // On first user message, create session and notify admin
  if (messages.length === 1) {
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("id, notified_admin")
      .eq("session_token", sessionToken)
      .single();

    if (!existing) {
      await supabase
        .from("chat_sessions")
        .insert({ session_token: sessionToken });

      // Fire-and-forget admin notification
      sendAdminNotification({
        subject: "New chat started on phaseonecoach.com",
        body: `A visitor just started a chat on the site.\n\nFirst message:\n"${messages[0].content}"\n\nLog in to Supabase to view the full conversation.`,
      }).catch(() => {});
    }
  }

  // Save the latest user message
  const latestUserMessage = messages[messages.length - 1];
  if (latestUserMessage.role === "user") {
    const { data: session } = await supabase
      .from("chat_sessions")
      .select("id")
      .eq("session_token", sessionToken)
      .single();

    if (session) {
      await supabase.from("chat_messages").insert({
        session_id: session.id,
        role: "user",
        content: latestUserMessage.content,
      });
    }
  }

  // Stream Claude response
  const stream = anthropic.messages.stream({
    model: "claude-haiku-4-5",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  });

  const encoder = new TextEncoder();
  let fullResponse = "";

  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          const text = event.delta.text;
          fullResponse += text;
          controller.enqueue(encoder.encode(text));
        }
      }

      // Save assistant response to DB
      const { data: session } = await supabase
        .from("chat_sessions")
        .select("id")
        .eq("session_token", sessionToken)
        .single();

      if (session && fullResponse) {
        await supabase.from("chat_messages").insert({
          session_id: session.id,
          role: "assistant",
          content: fullResponse,
        });
      }

      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
