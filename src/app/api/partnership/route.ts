import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PartnershipRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  partnership_type: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PartnershipRequest = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.partnership_type || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend with professional template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #000; color: #fff; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #000; margin-bottom: 5px; }
            .value { color: #555; padding: 10px; background: #fff; border-left: 3px solid #6366f1; }
            .description-box { background: #fff; padding: 15px; border-left: 3px solid #6366f1; margin-top: 10px; }
            .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Partnership Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${body.name}</div>
              </div>
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${body.phone || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${body.company}</div>
              </div>
              <div class="field">
                <div class="label">Partnership Type</div>
                <div class="value">${body.partnership_type}</div>
              </div>
              <div class="field">
                <div class="label">Partnership Description</div>
                <div class="description-box">${body.description.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated email from MP DAO Partnership Request Form</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const response = await resend.emails.send({
      from: 'noreply@mpdao.site',
      to: 'partnership@mpdao.site',
      replyTo: body.email,
      subject: `New Partnership Request from ${body.company}`,
      html: emailHtml,
    });

    if (!response.data?.id) {
      console.error('[v0] Resend response:', response);
      throw new Error('Failed to send email - no message ID returned');
    }

    console.log('[v0] Partnership email sent successfully:', response.data.id);
    return NextResponse.json(
      { success: true, message: 'Partnership request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[v0] Partnership API error:', errorMessage);
    return NextResponse.json(
      { error: `Failed to process partnership request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
