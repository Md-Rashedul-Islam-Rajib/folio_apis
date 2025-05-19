import catchAsync from "../../utilities/catchAsync";
import { sendImageToCloudinary } from "../../utilities/cloudinaryImageUploader";
import sendResponse from "../../utilities/sendResponse";
import { SkillServices } from "./skills.service";


export class SkillControllers {
  static createSkill = catchAsync(async (req, res) => {
    const payload = req.body;
    payload.icon = [];

    if (req.files && req.files instanceof Array) {
      const imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
          const imageName = `${uniqueSuffix}-${"rashedul-islam-rajib"}`;
          const path = file?.buffer;

          const { secure_url } = await sendImageToCloudinary(imageName, path);
          return secure_url;
        })
      );
      payload.icon = imageUrls;
    }
    const result = await SkillServices.createSkill(payload);
    sendResponse(
      res,
      201,
      true,
      "Skill created successfully",
      undefined,
      result
    );
  });
}
