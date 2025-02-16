import { createSSEStream } from '@/lib/sse';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return createSSEStream(id);
}
