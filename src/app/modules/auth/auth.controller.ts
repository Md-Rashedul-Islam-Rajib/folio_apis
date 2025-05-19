import catchAsync from "../../utilities/catchAsync";
import sendResponse from "../../utilities/sendResponse";
import { AuthServices } from "./auth.service";

export class AuthControllers {
    static login = catchAsync(async (req, res) => {
        const { accessToken, refreshToken } =
          await AuthServices.Login(req.body);

        res.cookie("refreshToken", refreshToken, {
          secure: false,
          httpOnly: true,
        });
        res.cookie("accessToken", accessToken, {
          secure: false,
          httpOnly: true,
        });

        sendResponse(res,200,true,"Logged in successfully",undefined,{accessToken,refreshToken});
    })
}