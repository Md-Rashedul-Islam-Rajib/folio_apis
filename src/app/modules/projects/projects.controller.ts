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
}