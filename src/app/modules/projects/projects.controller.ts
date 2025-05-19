import catchAsync from "../../utilities/catchAsync";
import { sendImageToCloudinary } from "../../utilities/cloudinaryImageUploader";
import sendResponse from "../../utilities/sendResponse";
import { ProjectServices } from "./projects.service";

export class ProjectControllers {
    static createProject = catchAsync(async (req, res) => {
        const payload = req.body;
        payload.imageUrl = [];

        if (req.files && req.files instanceof Array) {
          const imageUrls = await Promise.all(
            req.files.map(async (file) => {
              const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
              const imageName = `${uniqueSuffix}-${"rashedul-islam-rajib"}`;
              const path = file?.buffer;

              const { secure_url } = await sendImageToCloudinary(
                imageName,
                path
              );
              return secure_url;
            })
          );
          payload.imageUrl = imageUrls;
        }
        const result = await ProjectServices.createProject(payload);
        sendResponse(res,201,true,"Project created successfully",undefined,result)
    })
  
  static getAllProjects = catchAsync(async (req, res) => {
    const result = await ProjectServices.getAllProjects();
    sendResponse(res,200,true,"Projects fetched successfully",undefined,result)
  })

  static getSingleProject = catchAsync(async (req, res) => {
    const result = await ProjectServices.getSingleProject(req.params.id)
    sendResponse(res,200,true,"Project fetched successfully",undefined,result)
  })

  static updateProject = catchAsync(async (req, res) => {
    const payload = req.body;

    // Check if new image files are uploaded
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
          const imageName = `${uniqueSuffix}-${"rashedul-islam-rajib"}`;
          const path = file?.buffer;

          const { secure_url } = await sendImageToCloudinary(imageName, path);
          return secure_url;
        })
      );
      payload.imageUrl = imageUrls;
    } else {
      const existingProject = await ProjectServices.getSingleProject(
        req.params.id
      );
      if (existingProject) {
        payload.imageUrl = existingProject.imageUrl;
      }
    }

    const result = await ProjectServices.updateProject(req.params.id, payload);
    sendResponse(res,200,true,"Project updated successfully",undefined,result)
  })

}