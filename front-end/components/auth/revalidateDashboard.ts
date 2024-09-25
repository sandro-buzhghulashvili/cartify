'use server';

import { revalidatePath } from 'next/cache';

export const revalidateDashboard = () => {
  'use server';
  console.log('revalidated');
  revalidatePath('/dashboard');
};
