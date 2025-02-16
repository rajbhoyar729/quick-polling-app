// app/api/polls/[id]/results/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createSSEStream } from '@/lib/sse';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const poll = await prisma.poll.findUnique({
    where: { id: params.id },
    include: { options: true },
  });

  return NextResponse.json(poll?.options || []);
}



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return createSSEStream(params.id);
}