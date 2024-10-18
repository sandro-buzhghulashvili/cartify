'use server';

import { revalidatePath } from 'next/cache';

export const revalidateLandingPage = () => {
  'use server';
  revalidatePath('/');
};
