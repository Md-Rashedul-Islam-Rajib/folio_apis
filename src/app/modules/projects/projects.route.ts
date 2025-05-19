import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utilities/cloudinaryImageUploader";
import { ProjectControllers } from "./projects.controller";

const ProjectRoutes: Router = Router();

ProjectRoutes.post(
  "/",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
    },
  ProjectControllers.createProject
);

ProjectRoutes.get("/", ProjectControllers.getAllProjects);
ProjectRoutes.get("/:id", ProjectControllers.getSingleProject);

export default ProjectRoutes;