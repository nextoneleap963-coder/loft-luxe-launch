import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.in",
  port: Number(process.env.ZOHO_SMTP_PORT ?? "465"),
  secure: process.env.ZOHO_SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const fromEmail =
  process.env.ZOHO_FROM_EMAIL ?? process.env.ZOHO_SMTP_USER ?? "";
const fromName = process.env.ZOHO_FROM_NAME ?? "Bespoke Loft";

const buildEmailHtml = () => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, Helvetica, sans-serif; background-color: #f7f5f0; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(90deg, #b7955a, #d2b77c); padding: 28px 40px; text-align: center; color: #1F1B16;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">You're on the list</h1>
              <p style="margin: 12px 0 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Bespoke Loft is almost here</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; color: #2E261C;">
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Thank you for signing up to be the first to know.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Your journey towards crafted-to-measure elegance is about to begin.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                We're putting the final touches on something truly special&mdash;tailoring that fits not just your body, but your story.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                You'll be the first to know when Bespoke Loft officially opens its doors.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Stay sharp,
              </p>
              <p style="margin: 0 32px 0 0; line-height: 1.6; font-weight: bold;">
                The Bespoke Loft Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #F0E6D8; padding: 20px; text-align: center; color: #8A7C66; font-size: 12px;">
              Custom Tailors | 84 Barton Centre, MG Road, Bengaluru
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid request. Expected JSON body." },
      { status: 415 }
    );
  }

  const { email } = (await request.json()) as { email?: string };

  if (!email) {
    return NextResponse.json(
      { error: "Email address is required." },
      { status: 400 }
    );
  }

  if (!fromEmail || !process.env.ZOHO_SMTP_PASS) {
    return NextResponse.json(
      { error: "Email service is not configured. Please contact support." },
      { status: 500 }
    );
  }

  try {
    const response = await transporter.sendMail({
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: email,
      subject: "Welcome to Bespoke Loft — You're Officially on the List! 🎉",
      html: buildEmailHtml(),
    });
    console.log(response)
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log("Zoho send mail error", error);
    return NextResponse.json(
      {
        error:
          "We couldn't send the email right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }
}

