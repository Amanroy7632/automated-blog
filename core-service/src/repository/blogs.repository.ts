import { IBlogRepository } from "../interfaces";
import { Blog, generateSlug } from "../models";
export class BlogRepository implements IBlogRepository {
  async create(input: any): Promise<any> {
    const slug =generateSlug(input.title);
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      throw new Error("Blog already exists.");
    }
    return await Blog.create({...input,slug});
  }
  async findOne(slug: string): Promise<any> {
    return await Blog.findOne({ slug });
  }
  async findMany(pageLimit: number, skip: number): Promise<any> {
    const [blogs, total] = await Promise.all([
      Blog.find().limit(pageLimit).skip(skip),
      Blog.countDocuments(),
    ]);
    return { blogs, total };
  }
  async update(slug: string, input: any): Promise<any> {
    return await Blog.findOneAndUpdate({ slug }, { ...input }, { new: true });
  }
  async delete(slug: string): Promise<any> {
    return await Blog.findOneAndDelete({ slug });
  }
}
