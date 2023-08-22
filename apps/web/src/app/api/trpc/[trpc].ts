import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '~/trpc/root';
import { createTRPCContext } from '~/trpc/trpc';
import { ENV } from '~/env';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    ENV.NODE_ENV === 'dev'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
          );
        }
      : undefined,
});
