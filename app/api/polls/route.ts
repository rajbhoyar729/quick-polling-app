// app/api/polls/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const polls = await prisma.poll.findMany({ include: { options: true } });
  return NextResponse.json(polls);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { question, options } = body;

  const poll = await prisma.poll.create({
    data: {
      question,
      options: { create: options.map((option: string) => ({ text: option })) },
    },
    include: { options: true },
  });

  return NextResponse.json(poll, { status: 201 });
}