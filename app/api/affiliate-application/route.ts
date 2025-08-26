import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      websiteUrl,
      websiteType,
      socialMedia,
      description,
    } = body;

    const logoUrl =
      "https://cloud.appwrite.io/v1/storage/buckets/eTicketStorage/files/67e9748d001215c12347/view?project=66ccea4d0006b240505c&mode=admin";
    const darkLogoUrl =
      "https://cloud.appwrite.io/v1/storage/buckets/eTicketStorage/files/67e974f20022eec6322b/view?project=66ccea4d0006b240505c&mode=admin";

    await resend.emails.send({
      from: "GoBusly Affiliates <affiliates@gobusly.com>",
      to: email,
      subject: "Welcome to the GoBusly Affiliate Program",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>GoBusly Affiliate Application</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; background-color: #f5f5f5;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #ef4444; padding: 30px 40px; text-align: center;">
                      <!-- Replace with your actual hosted logo URL -->
                      <img src="${logoUrl}" alt="GoBusly Logo" style="height: 40px; width: auto;" />
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin-top: 0; color: #333333; font-size: 24px; font-weight: 600;">Thank you for your application, ${fullName}!</h1>
                      
                      <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 24px;">
                        We're excited that you want to join the GoBusly Affiliate Program! We've received your application and our team is reviewing it now.
                      </p>
                      
                      <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 24px;">
                        You can expect to hear back from us within <strong>24-48 hours</strong>. If approved, you'll receive your unique affiliate link and access to our affiliate dashboard.
                      </p>
                      
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; margin: 30px 0;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="margin-top: 0; color: #333333; font-size: 18px; font-weight: 600;">Application Details:</h3>
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Name:</td>
                                <td style="padding: 8px 0; color: #555555;">${fullName}</td>
                              </tr>
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Website:</td>
                                <td style="padding: 8px 0; color: #555555;">${
                                  websiteUrl || "Not provided"
                                }</td>
                              </tr>
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Website Type:</td>
                                <td style="padding: 8px 0; color: #555555;">${websiteType}</td>
                              </tr>
                              ${
                                socialMedia
                                  ? `
                                  <tr>
                                    <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Social Media:</td>
                                    <td style="padding: 8px 0; color: #555555;">${socialMedia}</td>
                                  </tr>
                                  `
                                  : ""
                              }
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 24px;">
                        While you wait, you can learn more about our affiliate program benefits and commission structure on our website.
                      </p>
                      
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="https://gobusly.com/affiliate-program" style="display: inline-block; background-color: #ef4444; color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-size: 16px;">Visit Affiliate Program</a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 10px;">
                        If you have any questions, please contact our affiliate support team at <a href="mailto:affiliates@gobusly.com" style="color: #ef4444; text-decoration: none; font-weight: 500;">affiliates@gobusly.com</a>.
                      </p>
                      
                      <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 24px;">
                        Best regards,<br>
                        The GoBusly Affiliate Team
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center">
                            <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">© 2025 GoBusly. All rights reserved.</p>
                            <p style="font-size: 12px; color: #6b7280; margin: 0;">
                              If you did not submit this application, please ignore this email.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    await resend.emails.send({
      from: "Affiliate Applications <affiliates@gobusly.com>",
      to: ["gobuslyinternal@gmail.com"],
      subject: "New Affiliate Application",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Affiliate Application</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; background-color: #f5f5f5;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #333333; padding: 20px 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Affiliate Application</h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="font-size: 16px; line-height: 1.6; color: #555555; margin-bottom: 24px;">
                        A new affiliate application has been submitted. Please review the details below:
                      </p>
                      
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9fafb; border-radius: 8px; margin: 20px 0;">
                        <tr>
                          <td style="padding: 25px;">
                            <h3 style="margin-top: 0; color: #333333; font-size: 18px; font-weight: 600;">Applicant Details:</h3>
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Name:</td>
                                <td style="padding: 8px 0; color: #555555;">${fullName}</td>
                              </tr>
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Email:</td>
                                <td style="padding: 8px 0; color: #555555;">${email}</td>
                              </tr>
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Website:</td>
                                <td style="padding: 8px 0; color: #555555;">${
                                  websiteUrl || "Not provided"
                                }</td>
                              </tr>
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Website Type:</td>
                                <td style="padding: 8px 0; color: #555555;">${websiteType}</td>
                              </tr>
                              ${
                                socialMedia
                                  ? `
                                  <tr>
                                    <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Social Media:</td>
                                    <td style="padding: 8px 0; color: #555555;">${socialMedia}</td>
                                  </tr>
                                  `
                                  : ""
                              }
                              <tr>
                                <td width="120" style="padding: 8px 0; font-weight: 600; color: #555555;">Description:</td>
                                <td style="padding: 8px 0; color: #555555;">${description}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="https://affiliate.gobusly.com/login" style="display: inline-block; background-color: #333333; color: #ffffff; font-weight: 600; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-size: 16px;">Login to you affiliate account here</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px 40px; border-top: 1px solid #e5e7eb;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td align="center">
                            <p style="font-size: 14px; color: #6b7280; margin: 0;">© 2025 GoBusly. All rights reserved.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error processing application" },
      { status: 500 }
    );
  }
}
