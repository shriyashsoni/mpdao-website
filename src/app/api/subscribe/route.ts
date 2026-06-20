import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send notification to Admin
    const adminEmail = await resend.emails.send({
      from: 'MP DAO <onboarding@resend.dev>',
      to: 'mpdaoofficial@gmail.com', // Resend testing only allows sending to your registered email
      subject: `New Newsletter Subscriber`,
      html: `
        <h3>New Newsletter Subscriber!</h3>
        <p>A new user has subscribed to the MP DAO newsletter.</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    });

    // Send welcome/confirmation to the user
    const userEmail = await resend.emails.send({
      from: 'MP DAO <onboarding@resend.dev>',
      to: email,
      subject: `Welcome to the MP DAO Newsletter!`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h2>Welcome to MP DAO!</h2>
          <p>Hi there,</p>
          <p>You have successfully subscribed to the MP DAO newsletter.</p>
          <p>We're excited to have you onboard. You'll now receive our latest updates, event invitations, and Web3 insights directly in your inbox.</p>
          <br/>
          <p>Stay ahead of the curve!</p>
          <p>Best regards,<br/>The MP DAO Team</p>
        </div>
      `
    });

    if (adminEmail.error) {
      console.error('Resend Error (Admin):', adminEmail.error);
    }
    if (userEmail.error) {
      console.error('Resend Error (User):', userEmail.error);
    }

    // Even if one fails (like unverified domain limits), we'll return success to not block the UI if it's just a sandbox limitation.
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Subscribe Route Error:", error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
