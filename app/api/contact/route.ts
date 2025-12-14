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
  name: string,
  fittingType: "studio" | "home"
) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, Helvetica, sans-serif; background-color: #f7f5f0; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(90deg, #b7955a, #d2b77c); padding: 28px 40px; text-align: center; color: #1F1B16;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">Fitting Request Received</h1>
              <p style="margin: 12px 0 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Bespoke Loft</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; color: #2E261C;">
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Dear ${name},
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Thank you for your interest in Bespoke Loft. We've received your request for a ${fittingType === "studio" ? "studio visit" : "home visit"} fitting.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                Our team will review your request and get back to you within 24 hours to confirm your appointment and discuss your requirements.
              </p>
              <p style="margin: 0 0 18px; line-height: 1.6;">
                We're excited to help you create something truly special—tailoring that fits not just your body, but your story.
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
  name: string,
  email: string,
  phone: string,
  fittingType: "studio" | "home",
  location: string,
  message: string
) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family: Arial, Helvetica, sans-serif; background-color: #f7f5f0; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(90deg, #b7955a, #d2b77c); padding: 28px 40px; text-align: center; color: #1F1B16;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">New Fitting Request</h1>
              <p style="margin: 12px 0 0; font-size: 16px; letter-spacing: 2px; text-transform: uppercase;">Bespoke Loft</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; color: #2E261C;">
              <h2 style="margin: 0 0 24px; font-size: 20px; color: #1F1B16;">Customer Details</h2>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0 0 12px; line-height: 1.6;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 0 0 24px; line-height: 1.6;"><strong>Fitting Type:</strong> ${fittingType === "studio" ? "Studio Visit" : "Home Visit"}</p>
              
              ${fittingType === "home" && location ? `<p style="margin: 0 0 24px; line-height: 1.6;"><strong>Location:</strong><br>${location.replace(/\n/g, "<br>")}</p>` : ""}
              
              ${message ? `<p style="margin: 0 0 24px; line-height: 1.6;"><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
              
              <p style="margin: 24px 0 0; line-height: 1.6; padding-top: 20px; border-top: 1px solid #E0D5C0;">
                Please contact the customer within 24 hours to confirm the appointment.
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
    name?: string;
    email?: string;
    phone?: string;
    fittingType?: "studio" | "home";
    location?: string;
    message?: string;
  };

  const { name, email, phone, fittingType = "studio", location, message } = body;

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email, and phone are required." },
      { status: 400 }
    );
  }

  if (fittingType === "home" && !location) {
    return NextResponse.json(
      { error: "Location is required for home visits." },
      { status: 400 }
    );
  }

  if (!fromEmail || !process.env.ZOHO_SMTP_PASS) {
    return NextResponse.json(
      { error: "Email service is not configured. Please contact support." },
      { status: 500 }
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 }
    );
  }

  try {
    // Send confirmation email to customer
    await transporter.sendMail({
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: email,
      subject: "Fitting Request Received — Bespoke Loft",
      html: buildConfirmationEmailHtml(name, fittingType),
    });

    // Send notification email to business
    await transporter.sendMail({
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: businessEmail,
      subject: `New Fitting Request from ${name} - ${fittingType === "studio" ? "Studio Visit" : "Home Visit"}`,
      html: buildNotificationEmailHtml(
        name,
        email,
        phone,
        fittingType,
        location || "",
        message || ""
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
