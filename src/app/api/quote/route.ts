import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  suburb: z.string().min(2),
  services: z.string().min(2),
  frequency: z.string().min(2),
  lawnSize: z.string().min(1),
  cornerBlock: z.string().min(1),
  accessNotes: z.string().optional().default(''),
  pets: z.string().min(1),
  preferredTime: z.string().optional().default(''),
  extraNotes: z.string().optional().default(''),
  website: z.string().optional().default(''),
  photosProvided: z.boolean()
});

const getClientIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

const rateLimit = (ip: string) => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.lastRequest > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return true;
  }
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  record.count += 1;
  record.lastRequest = now;
  rateLimitMap.set(ip, record);
  return true;
};

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
  const ip = getClientIp(request);
  if (!rateLimit(ip)) {
    return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  const photos = formData.getAll('photos');
  const photosProvided = photos.length > 0;

  const parsed = schema.safeParse({
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    suburb: payload.suburb,
    services: payload.services,
    frequency: payload.frequency,
    lawnSize: payload.lawnSize,
    cornerBlock: payload.cornerBlock,
    accessNotes: payload.accessNotes ?? '',
    pets: payload.pets,
    preferredTime: payload.preferredTime ?? '',
    extraNotes: payload.extraNotes ?? '',
    website: payload.website ?? '',
    photosProvided
  });

  if (!parsed.success) {
    return NextResponse.json({ message: 'Please check your details and try again.' }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ message: 'Submission flagged.' }, { status: 400 });
  }

  await prisma.quote.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      suburb: parsed.data.suburb,
      services: parsed.data.services,
      frequency: parsed.data.frequency,
      lawnSize: parsed.data.lawnSize,
      cornerBlock: parsed.data.cornerBlock,
      accessNotes: parsed.data.accessNotes || '',
      pets: parsed.data.pets,
      preferredTime: parsed.data.preferredTime || '',
      extraNotes: parsed.data.extraNotes || '',
      photosProvided
    }
  });

  const emailText = `New quote request from ${parsed.data.name}

Phone: ${parsed.data.phone}
Email: ${parsed.data.email}
Suburb: ${parsed.data.suburb}
Services: ${parsed.data.services}
Frequency: ${parsed.data.frequency}
Lawn size: ${parsed.data.lawnSize}
Corner block: ${parsed.data.cornerBlock}
Access notes: ${parsed.data.accessNotes || 'N/A'}
Pets: ${parsed.data.pets}
Preferred time: ${parsed.data.preferredTime || 'N/A'}
Extra notes: ${parsed.data.extraNotes || 'N/A'}
Photos provided: ${photosProvided ? 'Yes' : 'No'}
`;

  if (process.env.EMAIL_TO) {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || siteConfig.email,
      to: process.env.EMAIL_TO,
      subject: `New quote request - ${parsed.data.name}`,
      text: emailText
    });
  }

  return NextResponse.json({ message: 'Quote submitted' });
}
