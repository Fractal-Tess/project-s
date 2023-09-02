import { z } from 'zod';

export const registerFormValidator = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z.string().min(6),
});

export const loginFormValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const resetPasswordValidator = z.object({
  email: z.string().email(),
});
