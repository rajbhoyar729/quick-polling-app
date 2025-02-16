import prisma from '../lib/db';

export function createSSEStream(pollId: string) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        const interval = setInterval(async () => {
          const poll = await prisma.poll.findUnique({
            where: { id: pollId },
            include: { options: true },
          });
          controller.enqueue(`data: ${JSON.stringify(poll?.options)}\n\n`);
        }, 5000);

        return () => clearInterval(interval);
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    }
  );
}