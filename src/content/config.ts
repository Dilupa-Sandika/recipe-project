// මේක Astro වලට අදාළ "Zod" කියන rule-engine එක.
// මේකෙන් වෙන්නේ ඔයා recipe එකක් type කරද්දී වැරදුනොත් (උදා: title එක දාන්න අමතක වුනොත්) ඔයාට error එකක් පෙන්නන එක.

// src/content/config.ts
// මේක Astro වලට අදාළ "Zod" කියන rule-engine එක.
import { defineCollection, z } from 'astro:content';

// 'recipes' නමින් collection එකක් හදනවා
const recipesCollection = defineCollection({
  type: 'content', // අපි Markdown file (.md) පාවිච්චි කරනවා
  schema: z.object({
    title: z.string(),
    description: z.string().max(160, "SEO Description එක අකුරු 160ට අඩු වෙන්න ඕන"),
    publishDate: z.date(),
    image: z.string(), // Photo එකට path එක
    category: z.string(),
    tags: z.array(z.string()),
    prepTime: z.string(), // e.g., "15 min"
    cookTime: z.string(), // e.g., "30 min"
    servings: z.number(),
    
    // Homepage එකේ "Featured" විදිහට පෙන්නන්න
    isFeatured: z.boolean().default(false), 
    
    // Affiliate links වලට (Optional)
    affiliateLinks: z.array(z.object({
        label: z.string(),
        url: z.string().url()
    })).optional(),
    
    // YouTube Video ID එකට
    youtubeId: z.string().optional(), 
  }),
});

export const collections = {
  'recipes': recipesCollection,
};