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
    // core arguments
    name: z.string(),
    pronouns: z.string().optional(),
    program: z.string(),
    graduationYear: z.number(),

    // references
    projects: z.array(reference("projects")).optional(),

    // secondary arguments
    image: z.string().optional(),
    website: z.string().optional(),
    linkedIn: z.string().optional(),

    // tertiary arguments
    hometown: z.string().optional(),
    hobbies: z.string().optional(),
    funFact: z.string().optional(),

    // base arguments
    draft: z.boolean().optional(),
  }),
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    // core arguments
    title: z.string(),
    listingImage: z.string(),

    // references
    people: z.array(reference("people")),

    // secondary arguments
    instructor: z.string().optional(),
    listingDescription: z.string().optional(),
    imageGallery: z.array(z.string()).optional(),

    // tertiary arguments
    tags: z.array(z.string()).optional(),
    projectVideo: z.string().optional(),
    projectVideoUrl: z.string().optional(),

    // base arguments
    draft: z.boolean().optional(),
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
