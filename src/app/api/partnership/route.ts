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

    // Send email using Resend
    const response = await resend.emails.send({
      from: 'Partnership Requests <onboarding@resend.dev>',
      to: 'partnerships@mpdao.xyz',
      subject: `New Partnership Request from ${body.company}`,
      html: `
        <h2>New Partnership Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Partnership Type:</strong> ${body.partnership_type}</p>
        <h3>Description:</h3>
        <p>${body.description.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (!response.data?.id) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { success: true, message: 'Partnership request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Partnership API error:', error);
    return NextResponse.json(
      { error: 'Failed to process partnership request' },
      { status: 500 }
    );
  }
}
