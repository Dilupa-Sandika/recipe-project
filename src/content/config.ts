// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Regular expressions for validation
const timeFormatRegex = /^(\d+)\s*(min|hour|hrs?|minutes?)$/i;
const imagePathRegex = /^(.\/)?[a-zA-Z0-9-_\/]+\.(jpg|jpeg|png|webp)$/i;

// This is the schema for the affiliate link object
const affiliateLinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
});

const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // --- Original Validation Rules (Kept) ---
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(160, "SEO description must be under 160 characters"),
    publishDate: z.date(),
    image: z.string().regex(imagePathRegex, "Image path must be valid (e.g., ./image.jpg)"),
    category: z.string().min(3),
    tags: z.array(z.string().min(2)),
    prepTime: z.string().regex(timeFormatRegex, "Prep time must be in format: '30 min' or '2 hours'"),
    cookTime: z.string().regex(timeFormatRegex, "Cook time must be in format: '30 min' or '2 hours'"),
    servings: z.number().min(1).max(50),
    
    // Homepage එකේ "Featured" විදිහට පෙන්නන්න
    isFeatured: z.boolean().default(false), 
    
    // YouTube Video ID එකට
    youtubeId: z.string().optional(), 

    // --- NEW MODIFICATION (from your example) ---
    // These are now optional
    
    recommendedTools: z.array(affiliateLinkSchema).optional(),
    
    specialtyIngredients: z.array(affiliateLinkSchema).optional(),
    // --- END MODIFICATION ---
  }),
});

export const collections = {
  'recipes': recipesCollection,
};