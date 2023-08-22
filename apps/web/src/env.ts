import z from 'zod';

export const ENV = Object.freeze(
  z
    .object({
      NEXT_AUTH_SECRET: z.string(),
      NODE_ENV: z.enum(['dev', 'prod']),
    })
    .parse(process.env)
);
