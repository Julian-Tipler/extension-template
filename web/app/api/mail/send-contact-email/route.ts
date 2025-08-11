import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  throw new Error("Missing Mailgun environment variables");
}

export async function POST(request: Request) {
  const { name, userEmail, message } = await request.json();
  if (!name || !userEmail || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const subject = `New contact form submission from ${name}`;
  const text = `You have received a new message from ${name} (${userEmail}):\n\n${message}`;
  // const html = `<p>You have received a new message from <strong>${name}</strong> (${userEmail}):</p><p>${message}</p>`;

  try {
    const result = await sendEmail({
      to: process.env.MAILGUN_FROM_EMAIL || "<no-reply@yourdomain.com>",
      subject,
      text,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email", details: (error as Error).message },
      { status: 500 }
    );
  }
}

const mailgunClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text?: string;
}) => {
  return mailgunClient.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `Your App <no-reply@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    text,
    template: "mock email",
  });
};
