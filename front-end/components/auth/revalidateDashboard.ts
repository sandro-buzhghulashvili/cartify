'use server';

import { revalidatePath } from 'next/cache';

export const revalidateDashboard = () => {
  'use server';
  revalidatePath('/dashboard');
};
