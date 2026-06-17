const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL ?? "Phase One Coaching <noreply@phaseonecoach.com>";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phaseonecoach.com";

const ADMIN_EMAIL = "d.xavierpope@gmail.com";

export async function sendAdminNotification({
  subject,
  body,
}: {
  subject: string;
  body: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject,
      html: `<pre style="font-family:sans-serif;white-space:pre-wrap">${body}</pre>`,
    }),
  });
}

export async function sendLeadMagnetEmail(name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const downloadUrl = `${SITE_URL}/downloads/21-money-traps.pdf`;
  const bookingUrl =
    "https://api.leadconnectorhq.com/widget/booking/66cqZhBSxtjczGA5K7u8";

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
          <h2>Thanks, ${name.split(" ")[0]}!</h2>
          <p>Your copy of <strong>21 Money Traps That Kill First-Time Businesses Before They Start</strong> is ready.</p>
          <p>
            <a href="${downloadUrl}" style="display: inline-block; background: #7c3aed; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold;">
              Download Your Guide
            </a>
          </p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
          <h3>Want help putting it into action?</h3>
          <p>Reading the guide is step one — the founders who move fastest are the ones who get a second set of eyes on their plan early. If you haven't already, grab a free consultation and we'll walk through your specific situation and what to focus on next.</p>
          <p>
            <a href="${bookingUrl}" style="display: inline-block; background: transparent; color: #7c3aed; border: 2px solid #7c3aed; padding: 10px 22px; border-radius: 999px; text-decoration: none; font-weight: bold;">
              Book Your Free Consultation
            </a>
          </p>
          <p>If you have any questions in the meantime, just reply to this email.</p>
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
