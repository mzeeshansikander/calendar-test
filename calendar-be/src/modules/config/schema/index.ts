import { z } from 'nestjs-zod/z';

export const validationSchema = z.object({
  // APP
  TZ: z.string().default('UTC'),
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),

  // DATABASE
  MONGO_URL: z.string().url(),

  // JWT
  USER_SECRET_KEY: z.string().default('user_secret'),
  USER_EXPIRES_IN: z.string().default('1d'),
});

export type Config = z.infer<typeof validationSchema>;
