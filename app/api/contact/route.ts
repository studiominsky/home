// In: app/api/contact/route.ts

import EmailTemplate from '@/components/EmailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM || 'Hello <hello@studiominsky.com>';
const TO_EMAIL = process.env.CONTACT_TO || 'hello@studiominsky.com';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, services, honeypot } =
      body || {};

    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Name, email, and message are required.',
        },
        { status: 400 }
      );
    }

    const subject = `${name} has a message!`;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: subject,
      replyTo: email,
      react: EmailTemplate({
        name,
        email,
        message,
        company,
        services,
      }),
      text: `New message from ${name} (${email}).\n\nCompany: ${
        company || 'N/A'
      }\nServices: ${
        services?.join(', ') || 'N/A'
      }\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email.' },
        { status: 500 }
      );
    }

    // On success, return a positive response
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (exception) {
    console.error('Server Exception:', exception);
    return NextResponse.json(
      { ok: false, error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
