import { z } from 'zod';

export const reviewSchema = z.object({
  reviewBody: z.string().min(1, 'Please type a review'),
  rating: z.number().int().min(1, 'Please rate the product'),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;
