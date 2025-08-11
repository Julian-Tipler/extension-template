import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  throw new Error("Missing Mailgun environment variables");
}

export const mailgunClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export const sendEmail = async ({
  to,
  subject,
  text,
  // html,
}: {
  to: string;
  subject: string;
  text?: string;
  // html?: string;
}) => {
  return mailgunClient.messages.create(process.env.MAILGUN_DOMAIN!, {
    from: `Your App <no-reply@${process.env.MAILGUN_DOMAIN}>`,
    to,
    subject,
    text,
    template: "mock email"
  });
};

export const sendContactEmail = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const subject = `New contact form submission from ${name}`;
  const text = `You have received a new message from ${name} (${email}):\n\n${message}`;
  // const html = `<p>You have received a new message from <strong>${name}</strong> (${email}):</p><p>${message}</p>`;
    
  return sendEmail({
    to: process.env.MAILGUN_FROM_EMAIL || "<no-reply@yourdomain.com>",
    subject,
    text,
    // html,
  });
};
