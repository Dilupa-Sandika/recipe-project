import { defineCollection, z } from 'astro:content';

// Regular expressions for validation
const timeFormatRegex = /^(\d+)\s*(min|hour|hrs?|minutes?)$/i;
const imagePathRegex = /^(.\/)?[a-zA-Z0-9-_\/]+\.(jpg|jpeg|png|webp)$/i;

const recipesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(160, "SEO description must be under 160 characters"),
    publishDate: z.date(),
    image: z.string().regex(imagePathRegex, "Image path must be valid and in /images/ directory"),
    category: z.string().min(3),
    tags: z.array(z.string().min(2)),
    prepTime: z.string().regex(timeFormatRegex, "Prep time must be in format: '30 min' or '2 hours'"),
    cookTime: z.string().regex(timeFormatRegex, "Cook time must be in format: '30 min' or '2 hours'"),
    servings: z.number().min(1).max(50),
    
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