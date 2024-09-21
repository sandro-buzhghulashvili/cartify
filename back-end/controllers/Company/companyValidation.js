import { z } from 'zod';

export const companyAuthorizationSchema = z.object({
  companyName: z.string().min(1, { message: 'Please type company name' }),
  email: z.string().email({ message: 'Invalid email address' }),
  industryType: z.string({ message: 'Industry type is required' }),
  password: z
    .string()
    .min(7, { message: 'Password must be at least 7 characters' }),
});

export const validateCompany = (data) => {
  try {
    companyAuthorizationSchema.parse(data);
    return {
      success: true,
      data: {
        username: data.companyName,
        email: data.email,
        password: data.password,
      },
    };
  } catch (error) {
    let errors = null;

    if (error.errors.some((err) => err.message === 'Required')) {
      return { success: false, error: 'Please fill the form' };
    }

    if (error.errors.length > 1) {
      errors = error.errors.reduce((start, err) => {
        return start + `${err.message}, `;
      }, '');
    }

    if (error.errors.length === 1) {
      errors = error.errors[0].message;
    }

    return { success: false, error: errors };
  }
};
