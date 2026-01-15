import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  message: z.string().min(5)
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: process.env.EMAIL_USER
    ? {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    : undefined
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const parsed = schema.safeParse({
    name: payload.name,
    email: payload.email,
    phone: payload.phone ?? '',
    message: payload.message
  });

  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid message details.' }, { status: 400 });
  }

  if (process.env.EMAIL_TO) {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || siteConfig.email,
      to: process.env.EMAIL_TO,
      subject: `Website contact from ${parsed.data.name}`,
      text: `Name: ${parsed.data.name}
Email: ${parsed.data.email}
Phone: ${parsed.data.phone || 'N/A'}

Message:
${parsed.data.message}
`
    });
  }

  return NextResponse.json({ message: 'Message sent' });
}
