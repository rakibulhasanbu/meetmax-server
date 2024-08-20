import { z } from "zod";

const createPostSchema = z.object({
  body: z.object({
    postBy: z.object({
      userId: z.string(),
      name: z.string(),
      image: z.string().url(),
    }),
    description: z.string(),
    images: z
      .array(
        z.object({
          url: z.string().url(),
        }),
      )
      .optional(),
    isPublish: z.boolean().optional().default(false),
    liked: z.number().int().optional().default(0),
    comments: z.any().optional(),
    visibleBy: z.enum(["Friends", "Public"]).optional(),
  }),
});

const createCommentSchema = z.object({
  body: z.object({
    commentBy: z.object({
      userId: z.string(),
      name: z.string(),
      image: z.string().url(),
    }),
    text: z.string(),
    postId: z.string(),
  }),
});

const uploadImage = z.object({
  body: z.object({
    img: z.string(),
  }),
});

const updatePostSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
      }),
    )
    .optional(),
  isPublish: z.boolean().optional(),
  liked: z.number().int().optional(),
  comments: z.any().optional(),
  visibleBy: z.enum(["Friends", "Public"]).optional(),
});

export const PostValidationSchemas = {
  createPostSchema,
  createCommentSchema,
  updatePostSchema,
  uploadImage,
};
