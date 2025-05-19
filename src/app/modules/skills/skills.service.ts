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

  static async getAllSkills() {
    const result = await prisma.skill.findMany()
    return result;
  }

  static async getSingleSkill(id: string) {
    const result = await prisma.skill.findUnique({
      where: {id}
    })
    return result;
  }
}
