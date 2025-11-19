// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Regular expressions
const timeFormatRegex = /^(\d+)\s*(min|hour|hrs?|minutes?)$/i;
const imagePathRegex = /^(.\/)?[a-zA-Z0-9-_\/]+\.(jpg|jpeg|png|webp)$/i;

// 1. Recipes Collection
const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(160, "SEO description must be under 160 characters"),
    publishDate: z.date(),
    image: z.string().regex(imagePathRegex, "Image path must be valid and in /images/ directory"),
    category: z.string().min(3),
    tags: z.array(z.string().min(2)),
    prepTime: z.string().regex(timeFormatRegex),
    cookTime: z.string().regex(timeFormatRegex),
    servings: z.number().min(1).max(50),
    isFeatured: z.boolean().default(false),
    youtubeId: z.string().optional(),
    recommendedTools: z.array(z.object({
        label: z.string(),
        url: z.string().url()
    })).optional(),
    specialtyIngredients: z.array(z.object({
        label: z.string(),
        url: z.string().url()
    })).optional(),
  }),
});

// 2. Blog Collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    image: z.string(), // Blog post cover image
    tags: z.array(z.string()).optional(),
    author: z.string().default('Vegas Recipes'),
  }),
});

export const collections = {
  'recipes': recipesCollection,
  'blog': blogCollection,
};