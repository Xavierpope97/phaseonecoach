import { sendAdminNotification } from "@/lib/email";

export async function POST(req: Request) {
  const { subject, body } = await req.json();
  if (!subject || !body) return new Response("Missing fields", { status: 400 });

  try {
    await sendAdminNotification({ subject, body });
  } catch {
    // Non-fatal — don't let notification failure block the caller
  }

  return new Response("ok");
}
