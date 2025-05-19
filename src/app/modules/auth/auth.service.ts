import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../utilities/httpStatus";
import { generateToken } from "../../utilities/jwtHelper";
import { TLogin } from "./auth.types";
import prisma from "../../config/prisma";

export class AuthServices {
  static async Login(payload: TLogin) {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: payload.email
      },
    });

    const isPasswordCorrect: boolean = await bcrypt.compare(
      payload.password,
      userData.password
    );

    if (!isPasswordCorrect) {
      throw new AppError(httpStatus.FORBIDDEN, "Invalid Credentials");
    }

    const accessToken = generateToken(
      {
        email: userData.email,
        role: "ADMIN",
      },
      config.jwt.jwt_secret as string,
      config.jwt.jwt_expiration as string
    );

    const refreshToken = generateToken(
      {
        email: userData.email,
        role: "ADMIN",
      },
      config.jwt.refresh_secret as string,
      config.jwt.jwt_refresh_expiration as string
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
