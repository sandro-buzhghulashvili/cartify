import { z } from 'zod';

export const clientAuthenticationSchema = z.object({
  name: z.string().min(1, { message: 'Please type your name' }),
  password: z.string().min(1, { message: 'Please type password' }),
});

export type ClientAuthenticationType = z.infer<
  typeof clientAuthenticationSchema
>;
