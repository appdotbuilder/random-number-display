
import { z } from 'zod';

// Random number response schema
export const randomNumberSchema = z.object({
  value: z.number().int().min(0).max(10000),
  timestamp: z.coerce.date()
});

export type RandomNumber = z.infer<typeof randomNumberSchema>;

// No input needed for random number generation
export const generateRandomNumberInputSchema = z.object({});

export type GenerateRandomNumberInput = z.infer<typeof generateRandomNumberInputSchema>;
