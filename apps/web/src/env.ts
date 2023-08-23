import z from 'zod';

export const ENV = Object.freeze(
  z
    .object({
      NEXTAUTH_SECRET: z.string(),
      NEXTAUTH_URL: z.string(),
      NODE_ENV: z.enum(['development', 'production']),
    })
    .parse(process.env)
);
