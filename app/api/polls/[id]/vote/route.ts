// app/api/polls/[id]/vote/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { option } = body;

  await prisma.option.updateMany({
    where: { text: option, pollId: params.id },
    data: { votes: { increment: 1 } },
  });

  return NextResponse.json({ message: 'Vote recorded successfully' });
}