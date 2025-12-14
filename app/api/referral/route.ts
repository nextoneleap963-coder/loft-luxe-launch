import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.in",
  port: Number(process.env.ZOHO_SMTP_PORT ?? "465"),
  secure: process.env.ZOHO_SMTP_PORT === "465",
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
const businessEmail = process.env.BUSINESS_EMAIL ?? "info@bespokeloft.in";

const buildConfirmationEmailHtml = (
  referrerName: string,
  type: "tailor" | "master"
) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, Helvetica, sans-serif; background-color: #f7f5f0; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(90deg, #b7955a, #d2b77c); padding: 28px 40px; text-align: center; color: #1F1B16;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">Thank You for Your Referral</h1>
              <p style="margin: 12px 0 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Bespoke Loft</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; color: #2E261C;">
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Dear ${referrerName},
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Thank you for referring a ${type === "tailor" ? "tailor" : "master tailor"} to Bespoke Loft. We truly appreciate your trust in us and your contribution to building our team.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                We've received your referral and will review the candidate's details. Our team will get in touch with you within 24 hours to discuss the next steps.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Your support helps us maintain the highest standards of craftsmanship and excellence.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Best regards,
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

const buildNotificationEmailHtml = (
  referrerName: string,
  referrerPhone: string,
  referrerEmail: string,
  candidateName: string,
  candidatePhone: string,
  experience: string,
  message: string,
  type: "tailor" | "master"
) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, Helvetica, sans-serif; background-color: #f7f5f0; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(90deg, #b7955a, #d2b77c); padding: 28px 40px; text-align: center; color: #1F1B16;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">New ${type === "tailor" ? "Tailor" : "Master Tailor"} Referral</h1>
              <p style="margin: 12px 0 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Bespoke Loft</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; color: #2E261C;">
              <h2 style="margin: 0 0 24px; font-size: 20px; color: #1F1B16;">Referrer Details</h2>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Name:</strong> ${referrerName}</p>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Phone:</strong> ${referrerPhone}</p>
              <p style="margin: 0 0 24px; line-height: 1.6;"><strong>Email:</strong> ${referrerEmail || "Not provided"}</p>
              
              <h2 style="margin: 24px 0; font-size: 20px; color: #1F1B16;">Candidate Details</h2>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Name:</strong> ${candidateName}</p>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Phone:</strong> ${candidatePhone}</p>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Experience:</strong> ${experience}</p>
              ${message ? `<p style="margin: 0 0 24px; line-height: 1.6;"><strong>Additional Notes:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
              
              <p style="margin: 24px 0 0; line-height: 1.6; padding-top: 20px; border-top: 1px solid #E0D5C0;">
                Please review this referral and contact the referrer within 24 hours.
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

  const body = (await request.json()) as {
    referrerName?: string;
    referrerPhone?: string;
    referrerEmail?: string;
    candidateName?: string;
    candidatePhone?: string;
    experience?: string;
    message?: string;
    type?: "tailor" | "master";
  };

  const {
    referrerName,
    referrerPhone,
    referrerEmail,
    candidateName,
    candidatePhone,
    experience,
    message,
    type = "tailor",
  } = body;

  if (!referrerName || !referrerPhone || !candidateName || !candidatePhone || !experience) {
    return NextResponse.json(
      { error: "Missing required fields." },
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
    // Send confirmation email to referrer (if email provided)
    if (referrerEmail) {
      await transporter.sendMail({
        from: {
          name: fromName,
          address: fromEmail,
        },
        to: referrerEmail,
        subject: "Thank You for Your Referral — Bespoke Loft",
        html: buildConfirmationEmailHtml(referrerName, type),
      });
    }

    // Send notification email to business
    await transporter.sendMail({
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: businessEmail,
      subject: `New ${type === "tailor" ? "Tailor" : "Master Tailor"} Referral from ${referrerName}`,
      html: buildNotificationEmailHtml(
        referrerName,
        referrerPhone,
        referrerEmail || "",
        candidateName,
        candidatePhone,
        experience,
        message || "",
        type
      ),
    });

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
