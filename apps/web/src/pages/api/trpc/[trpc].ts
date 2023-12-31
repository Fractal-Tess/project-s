import { createNextApiHandler } from '@trpc/server/adapters/next';
import { env } from '@/env.mjs';
import { appRouter } from '@/server/api/root';
import { createContext } from '@/server/api/trpc';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ path, error }) {
    if (env.NODE_ENV === 'development') {
      console.error(
        `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
      );
    }
  },
});
