import { NextFunction, Request, Response } from "express";
import { BlogRepository } from "../repository/blogs.repository";
import { ApiError, ApiResponse, filterQuery, RequestValidator } from "../utils";
import { CreateBlogRequest, UpdateBlogRequest } from "../dto/blogs.dto";
export class BlogController {
  private _repo: BlogRepository;
  constructor(repository: BlogRepository) {
    this._repo = repository;
    this.createBlog = this.createBlog.bind(this);
    this.getBlogs = this.getBlogs.bind(this);
    this.getBlog = this.getBlog.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
  }
  async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {req.body
      // console.log();
      
      const { errors, input } = await RequestValidator(
        CreateBlogRequest,
        req.body
      );
      if (errors) {
        return next(new ApiError(400, "Invalid input fields."));
      }
      const blog = await this._repo.create(input);
      if (!blog) {
        return next(new ApiError(500, "Failed to create blog."));
      }
      return res.status(201).json(new ApiResponse(201, blog, "OK"));
    } catch (error) {
      next(error);
    }
  }
  async getBlog(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { slug } = req.params;
      if (!slug) {
        return next(new ApiError(400, "Slug is required."));
      }
      const blog = await this._repo.findOne(slug);
      return res.status(200).json(new ApiResponse(200, blog, "OK"));
    } catch (error) {
      next(error);
    }
  }
  async getBlogs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { page, limit } = req.query;
      const { currentPage, skip, pageLimit } = filterQuery.getPaginatedValue(
        page !== undefined ? page.toString() : "1",
        limit !== undefined ? limit.toString() : "10"
      );
      const { blogs, total } = await this._repo.findMany(pageLimit, skip);
      return res.status(200).json(
        new ApiResponse(200, {
          blogs,
          totalPages: Math.ceil(total / pageLimit),
          currentPage,
        })
      );
    } catch (error) {
      next(error);
    }
    return res.status(200).json({ message: "Ok" });
  }
  async updateBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { slug } = req.params;
      if (!slug) {
        return next(new ApiError(400, "Slug is required."));
      }
      const {errors,input} = await RequestValidator(UpdateBlogRequest,req.body);
      if (errors) {
        return next(new ApiError(400, "Invalid input fields."));
      }
      const blog = await this._repo.update(slug,input);
      return res.status(200).json(new ApiResponse(200,blog));
    } catch (error) {
      next(error);
    }
  }
  async deleteBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { slug } = req.params;
      if (!slug) {
        return next(new ApiError(400, "Slug is required."));
      }
      const blog = await this._repo.delete(slug);
      return res.status(200).json(new ApiResponse(200, blog));
    } catch (error) {
      next(error);
    }
  }
}
