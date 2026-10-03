import { Resend } from "resend";
import { profile } from "@/data/resume";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Chat widget submissions → an email to Ketan, with Reply-To set to the visitor. */
export async function POST(request: Request) {
  let body: { email?: unknown; message?: unknown; website?: unknown; elapsed?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  const website = typeof body.website === "string" ? body.website : "";
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;

  // Bots fill the hidden field or submit instantly; pretend success so they don't retry.
  if (website || elapsed < 3000) return Response.json({ ok: true });

  if (!EMAIL_RE.test(email)) return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!message) return Response.json({ error: "Please write a message." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json(
      { error: `Chat isn't set up yet. Email me at ${profile.email} instead.` },
      { status: 503 },
    );
  }

  const { error } = await new Resend(key).emails.send({
    from: "Portfolio chat <onboarding@resend.dev>",
    to: profile.email,
    replyTo: email,
    subject: `Portfolio message from ${email}`,
    text: `${message}\n\n— sent from your portfolio chat by ${email}`,
  });

  if (error) {
    return Response.json({ error: `Couldn't send right now. Email me at ${profile.email}.` }, { status: 502 });
  }
  return Response.json({ ok: true });
}
