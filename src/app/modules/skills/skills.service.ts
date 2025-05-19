import prisma from "../../config/prisma";
import { TSkill } from "./skills.type";


export class SkillServices {
  static async createSkill(payload: TSkill) {
    console.log({ payload });
    const result = await prisma.skill.create({
      data: payload,
    });

    return result;
  }
}
