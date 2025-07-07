import { Schema, model } from "mongoose";
const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: {
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
// BlogSchema.index({slug:1});
BlogSchema.pre("save", function (next) {
  this.slug = generateSlug(this.title);
  next();
});
export const Blog = model("Blog", BlogSchema);
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 100); // limit slug length
}
