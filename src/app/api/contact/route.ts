import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const { name, query, mobile, email, about } = await req.json();

    if (!name || !query || !mobile || !email || !about) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email to MP DAO Team
    const adminEmail = await resend.emails.send({
      from: 'MP DAO <onboarding@resend.dev>', // Depending on Resend setup, you may need a verified domain here. Use onboarding@resend.dev as default if unverified.
      to: 'contact@mpdao.in', // Target MP DAO email. If using free Resend without a domain, you can only send to your verified email.
      subject: `New Connect Request: ${query}`,
      html: `
        <h3>New Contact Request from Website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Query Type:</strong> ${query}</p>
        <p><strong>Message:</strong></p>
        <p>${about}</p>
      `
    });

    // Send confirmation email to User
    const userEmail = await resend.emails.send({
      from: 'MP DAO <onboarding@resend.dev>', // Change to contact@mpdao.in if domain is verified
      to: email,
      subject: `We received your request: ${query}`,
      html: `
        <h3>Hi ${name},</h3>
        <p>Your query is successfully received. Our team will contact you soon!</p>
        <br/>
        <p><strong>Your Message:</strong></p>
        <p>${about}</p>
        <br/>
        <p>Best regards,<br/>MP DAO Team</p>
      `
    });

    if (adminEmail.error) {
      console.error('Resend Error (Admin):', adminEmail.error);
    }
    if (userEmail.error) {
      console.error('Resend Error (User):', userEmail.error);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
