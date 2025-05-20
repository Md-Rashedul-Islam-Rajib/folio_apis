import catchAsync from "../../utilities/catchAsync";
import { sendImageToCloudinary } from "../../utilities/cloudinaryImageUploader";
import sendResponse from "../../utilities/sendResponse";
import { BlogServices } from "./blogs.service";


export class BlogControllers {
  static createBlog = catchAsync(async (req, res) => {
    const payload = req.body;
    payload.coverImage = [];

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
      payload.coverImage = imageUrls;
    }
    const result = await BlogServices.createBlog(payload);
    sendResponse(
      res,
      201,
      true,
      "Blog created successfully",
      undefined,
      result
    );
  });

  static getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogServices.getAllBlogs();
    sendResponse(res,200,true,"Blogs fetched successfully",undefined,result)
  })


  static getSingleBlog = catchAsync(async (req, res) => {
    const result = await BlogServices.getSingleBlog(req.params.id);
    sendResponse(res,200,true,"Blog fetched successfully",undefined,result)
  })

}
