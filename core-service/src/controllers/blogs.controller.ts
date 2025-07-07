import { NextFunction, Request, Response } from "express";
import { BlogRepository } from "../repository/blogs.repository";

export class BlogController {
  private _repo: BlogRepository;
  constructor(repository: BlogRepository) {
    this._repo = repository;
    this.createBlog=this.createBlog.bind(this);
    this.getBlogs=this.getBlogs.bind(this);
    this.getBlog=this.getBlog.bind(this);
    this.updateBlog=this.updateBlog.bind(this);
    this.deleteBlog=this.deleteBlog.bind(this);
  }
  async createBlog(req: Request, res: Response, next: NextFunction):Promise<any>  {}
  async getBlog(req: Request, res: Response, next: NextFunction) :Promise<any> {}
  async getBlogs(req: Request, res: Response, next: NextFunction):Promise<any> {
    return res.status(200).json({message:"Ok"});
  }
  async updateBlog(req: Request, res: Response, next: NextFunction):Promise<any>  {}
  async deleteBlog(req: Request, res: Response, next: NextFunction) :Promise<any> {}
}
