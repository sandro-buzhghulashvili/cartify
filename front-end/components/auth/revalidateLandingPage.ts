'use server';

import { revalidatePath } from 'next/cache';

export const revalidateLandingPage = () => {
  'use server';
  console.log('revalidated');
  revalidatePath('/');
};
