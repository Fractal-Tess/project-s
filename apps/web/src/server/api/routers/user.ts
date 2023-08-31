import { publicProcedure, createTRPCRouter } from '@/server/api/trpc';
import { userValidator } from '@/validators/user';
import { env } from '@/env.mjs';
import type { z } from 'zod';
import { TRPCError } from '@trpc/server';

type res =
  | {
      err: {
        cause: keyof z.infer<typeof userValidator>;
        message: string;
      };
      success: false;
    }
  | { success: true };
export const user = createTRPCRouter({
  register: publicProcedure
    .input(userValidator)
    .mutation(({ input, ctx }): res => {
      if (!env.ENABLE_NEW_USER_REGISTER) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'New user registration is disabled',
        });
      }
      return {
        success: false,
        err: {
          cause: 'email',
          message: 'Email already in use',
        },
      };
    }),
});
