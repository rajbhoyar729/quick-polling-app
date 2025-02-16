import { createSSEStream } from '@/lib/sse';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return createSSEStream(params.id);
}