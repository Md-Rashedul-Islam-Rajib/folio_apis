import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { UserServices } from "./users.service";

export class UserControllers {
    static createUser = catchAsync(async (req, res) => {
        const result = await UserServices.createUser(req.body);
        sendResponse(res,201,true,"User Created successfully",undefined,result)
    })
}