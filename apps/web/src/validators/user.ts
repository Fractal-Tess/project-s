import { z } from 'zod';

export const userValidator = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
  email: z.string().email(),
});
