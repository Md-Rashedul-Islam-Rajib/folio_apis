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

    static getAllSkills = catchAsync(async (req, res) => {
        const result = await SkillServices.getAllSkills();
        sendResponse(res,200,true,"Skills fetched successfully",undefined,result)
    })

    static getSingleSkill = catchAsync(async (req, res) => {
        const result = await SkillServices.getSingleSkill(req.params.id);
        sendResponse(res,200,true,"Skill fetched successfully",undefined,result)    
    })

    static updateSkill = catchAsync(async (req, res) => {
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
             payload.icon = imageUrls;
           } else {
             const existingSkill = await SkillServices.getSingleSkill(
               req.params.id
             );
             if (existingSkill) {
               payload.icon = existingSkill.icon;
             }
        }
        const result = await SkillServices.updateSkill(req.params.id, payload);
        sendResponse(res,200,true,"Skill updated successfully",undefined,result)
    })


    static deleteSkill = catchAsync(async (req, res) => {
        await SkillServices.deleteSkill(req.params.id);
        sendResponse(res,200,true,"Skill deleted successfully",undefined,undefined)
    })
}
