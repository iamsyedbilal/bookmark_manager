import { z } from "zod";

export const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  url: z.url("Enter a valid URL"),

  tags: z.string().min(1, "At least one tag is required"),
});

export type BookmarkFormValues = z.infer<typeof bookmarkSchema>;
