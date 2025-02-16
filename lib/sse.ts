// lib/sse.ts
import prisma from '@/lib/db';

export function createSSEStream(pollId: string) {
  return new Response(
    new ReadableStream({
      async start(controller) {
        let previousData: unknown;
        const interval = setInterval(async () => {
          try {
            const poll = await prisma.poll.findUnique({
              where: { id: pollId },
              include: { options: true },
            });
            if (!poll) {
              // End stream if poll is not found
              controller.error(new Error('Poll not found'));
              clearInterval(interval);
              return;
            }
            // Only send new data if it has changed
            const currentData = poll.options;
            if (JSON.stringify(currentData) !== JSON.stringify(previousData)) {
              previousData = currentData;
              controller.enqueue(`data: ${JSON.stringify(currentData)}\n\n`);
            }
          } catch (error) {
            controller.error(error);
            clearInterval(interval);
          }
        }, 5000);

        // Return cleanup function on cancellation
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
