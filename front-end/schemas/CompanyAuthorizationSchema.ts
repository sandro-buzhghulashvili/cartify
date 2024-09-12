import { z } from 'zod';

export const companyAuthorizationSchema = z.object({
  companyName: z.string().min(1, { message: 'Please type company name' }),
  email: z.string().email({ message: 'Invalid email address' }),
  industryType: z.string({ message: 'Industry type is required' }),
  password: z
    .string()
    .min(7, { message: 'Password must be at least 7 characters' }),
});

export type CompanyAuthorizationType = z.infer<
  typeof companyAuthorizationSchema
>;
