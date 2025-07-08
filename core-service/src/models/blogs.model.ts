import { Schema, model, Document } from "mongoose";

// Slug generation utility
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100);
}

// TypeScript interface
interface IBlog extends Document {
  slug: string;
  title: string;
  content: string;
  isPublished?: boolean;
  publishedAt?: Date;
  isExpired?: boolean;
}

const BlogSchema = new Schema<IBlog>(
  {
    slug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

// Only generate slug if it hasn't been set or title is modified
BlogSchema.pre<IBlog>("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = generateSlug(this.title);
  next();
});

export const Blog = model<IBlog>("Blog", BlogSchema);
