import prisma from "../../config/prisma";
import { TProject } from "./projects.type";

export class ProjectServices {
    static async createProject(payload: TProject) {
        console.log({payload})
        const result = await prisma.project.create({
            data: payload
        })

        return result;
    }

    
}