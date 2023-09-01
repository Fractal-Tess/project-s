import { publicProcedure, createTRPCRouter } from '@/server/api/trpc';
import { hash, genSalt } from 'bcrypt';
import { userValidator } from '@/validators/user';
import { env } from '@/env.mjs';
import type { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { eq, or } from 'drizzle-orm';
import { user as userSchema } from '@/drizzle/schema';
import { randomBytes } from 'node:crypto';

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
    .mutation(async ({ input, ctx }): Promise<res> => {
      if (!env.ENABLE_NEW_USER_REGISTER) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'New user registration is disabled',
        });
      }

      const result = await ctx.db.query.user.findFirst({
        where: or(
          eq(userSchema.email, input.email),
          eq(userSchema.username, input.username)
        ),
      });

      if (result) {
        if (result.email === input.email) {
          return {
            success: false,
            err: {
              cause: 'email',
              message: 'Email already in use',
            },
          };
        } else if (result.username === input.username)
          return {
            success: false,
            err: {
              cause: 'username',
              message: 'Username already in use',
            },
          };
      }

      const salt = await genSalt(10);
      const passwordHash = await hash(input.password, salt);
      const emailConfirmationToken = randomBytes(32).toString('hex');

      await ctx.db.insert(userSchema).values({
        email: input.email,
        username: input.username,
        password: passwordHash,
        emailConfirmationToken,
      });

      return { success: true };
    }),
});
