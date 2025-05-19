import config from "../../config";
import prisma from "../../config/prisma";
import { TUser } from "./users.type";
import bcrypt from "bcrypt";
export class UserServices {
    static async createUser(payload: TUser) {
        const hashPassword: string = await bcrypt.hash(
          payload.password,
          Number(config.bcrypt_salt_rounds)
        );
        const userData = {
          ...payload,
          role: "ADMIN",
          password: hashPassword,
        };

        const result = await prisma.user.create({
          data: userData,
        });

        return result;
    }
}