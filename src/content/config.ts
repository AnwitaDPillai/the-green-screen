import { defineCollection, z } from 'astro:content';

const archive = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    author: z.string(),
    authorBio: z.string().optional(),
    genre: z.enum(['Fiction', 'Essay', 'Poetry']),
    buildingTypology: z.enum([
      'Cinema',
      'Library',
      'School',
      'Housing Block',
      'Civic Hall',
      'Industrial',
    ]),
    pairedBuildingName: z.string(),
    pairedIntervention: z.string(),
    pairedBuildingLocation: z.string(),
    issueNumber: z.number().default(1),
    readingTimeMinutes: z.number(),
    featured: z.boolean().default(false),
    status: z.enum(['draft', 'review', 'approved', 'published']),
    approvedBy: z.string().optional(),
    approvedAt: z.coerce.date().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    sources: z.array(z.string()).default([]),
  }),
});

const screeningRoom = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    episodeNumber: z.number(),
    duration: z.string(),
    speakers: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
      })
    ),
    recordingDate: z.coerce.date(),
    audioUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    pairedPieceTitle: z.string(),
    status: z.enum(['draft', 'review', 'approved', 'published']),
    approvedBy: z.string().optional(),
    approvedAt: z.coerce.date().optional(),
    publishDate: z.coerce.date(),
  }),
});

const issues = defineCollection({
  type: 'content',
  schema: z.object({
    issueNumber: z.number(),
    title: z.string(),
    theme: z.string(),
    seasonYear: z.string(),
    editorsNote: z.string(),
    status: z.enum(['draft', 'review', 'approved', 'published']),
    approvedBy: z.string().optional(),
    approvedAt: z.coerce.date().optional(),
    publishDate: z.coerce.date(),
  }),
});

export const collections = {
  archive,
  'screening-room': screeningRoom,
  issues,
};
