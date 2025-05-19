import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utilities/cloudinaryImageUploader";
import { SkillControllers } from "./skills.controller";

const SkillRoutes: Router = Router();

SkillRoutes.post(
  "/",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  SkillControllers.createSkill
);
SkillRoutes.get('/', SkillControllers.getAllSkills);

export default SkillRoutes;
