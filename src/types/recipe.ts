import { z } from 'zod';

export const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().or(z.date()),
  author: z.string(),
  image: z.string().optional(),
  category: z.string(),
  ingredients: z.array(z.object({
    item: z.string(),
    amount: z.string(),
    unit: z.string().optional(),
  })),
  instructions: z.array(z.string()),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string()).optional(),
});

export type Recipe = z.infer<typeof recipeSchema>;