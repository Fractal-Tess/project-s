import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '~/trpc/root';
import { createTRPCContext } from '~/trpc/trpc';
import { ENV } from '~/env';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: 'api/trpc',
    req,
    router: appRouter,
    onError: ({ path, error }) => {
      if (ENV.NODE_ENV !== 'development') return;
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message} `
      );
    },
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
