import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
});

export async function sendConfirmationEmail(
  to: string,
  subject: string,
  html: string
) {
  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: process.env.MAILGUN_FROM!,
      to,
      subject,
      html,
    });
    console.log("Mailgun response:", response);
  } catch (err) {
    console.error("Mailgun error:", err);
  }
}
