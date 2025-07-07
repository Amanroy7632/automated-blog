import { Router } from "express";
import { BlogController } from "../controllers";
import { BlogRepository } from "../repository/blogs.repository";
const blogRouter = Router();
const controller = new BlogController(new BlogRepository());
blogRouter.route("/").post(controller.createBlog);
blogRouter.route("/:id").get(controller.getBlog);
blogRouter.route("/").get(controller.getBlogs);
blogRouter.route("/").patch(controller.updateBlog);
blogRouter.route("/:id").delete(controller.deleteBlog);
export {blogRouter}