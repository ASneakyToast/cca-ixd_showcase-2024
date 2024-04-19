// 1. Import utilities from `astro:content`

import { defineCollection, reference, z } from "astro:content";



// 2. Define your collection(s)

/* NOTES
 * People doesn't reference projects, because unlike projects, people can exist without them.
 * edit: actually I think this is wrong, I should put it in here because it's going to be used on the people page?
 * edit-x2: that's true I believe actually
 */

const peopleCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    hometown: z.string().optional(),
    pronouns: z.string(),
    likes: z.array(z.string()),
    image: z.string().optional(),
    projects: z.array(reference("projects")),
    website: z.string().optional(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    listingDescription: z.string(),
    listingImage: z.string(),
    people: z.array(reference("people")),
    tags: z.array(z.string()),
    instructor: z.string().optional(),
  }),
});



// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"

export const collections = {
  "people": peopleCollection,
  "projects": projectCollection,
};



// Cheatsheet of many common Zod datatypes
/*
   isDraft: z.boolean(),
    title: z.string(),
    sortOrder: z.number(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    // define author in this schema
    author: z.string().default('Anonymous'),
    // Reference single author in another collection
    author: reference('authors'),
    // Reference an array of related posts from the `blog` collection by `slug`
    relatedPosts: z.array(reference('blog')),
    language: z.enum(['en', 'es']),
    tags: z.array(z.string()),
    // An optional frontmatter property. Very common!
    footnote: z.string().optional(),
    // In frontmatter, dates written without quotes around them are interpreted as Date objects
    publishDate: z.date(),
    // You can also transform a date string (e.g. "2022-07-08") to a Date object
    // publishDate: z.string().transform((str) => new Date(str)),
    // Advanced: Validate that the string is also an email
    authorContact: z.string().email(),
    // Advanced: Validate that the string is also a URL
    canonicalURL: z.string().url(),
*/
