import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utilities/cloudinaryImageUploader";
import { BlogControllers } from "./blogs.controller";


const BlogRoutes: Router = Router();

BlogRoutes.post(
  "/",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BlogControllers.createBlog
);

BlogRoutes.get('/', BlogControllers.getAllBlogs);
BlogRoutes.get('/:id', BlogControllers.getSingleBlog);
BlogRoutes.put(
  "/:id",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BlogControllers.updateBlog
);
BlogRoutes.delete('/:id', BlogControllers.deleteBlog);

export default BlogRoutes;
