import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(1, { message: 'Please type your name' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumberExtension: z
      .string()
      .length(4, { message: 'Type a correct extension' }),
    phoneNumber: z
      .string()
      .regex(/^\d{9}$/, { message: 'Phone number must be 9 digits' }),
    password: z
      .string()
      .min(7, { message: 'Password must be at least 7 characters' }),
    confirmPassword: z
      .string()
      .min(7, { message: 'Confirm password must be at least 7 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
  .refine((data) => data.phoneNumberExtension[0] === '+', {
    message: 'Type a correct extension',
    path: ['phoneNumberExtension'],
  });

export type UserType = z.infer<typeof userSchema>;
