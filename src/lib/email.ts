const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL ?? "Phase One Coaching <noreply@phaseonecoach.com>";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phaseonecoach.com";

export async function sendLeadMagnetEmail(name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const downloadUrl = `${SITE_URL}/downloads/21-money-traps.pdf`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: email,
      subject: "Your guide: 21 Money Traps That Kill First-Time Businesses",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Hey ${name.split(" ")[0]},</h2>
          <p>Thanks for requesting your free copy of <strong>21 Money Traps That Kill First-Time Businesses Before They Start</strong>.</p>
          <p>You can download it here:</p>
          <p>
            <a href="${downloadUrl}" style="display: inline-block; background: #7c3aed; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold;">
              Download Your Guide
            </a>
          </p>
          <p>If you have any questions about your business's next move, just reply to this email.</p>
          <p>— Phase One Coaching</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error (${res.status}): ${body}`);
  }
}
