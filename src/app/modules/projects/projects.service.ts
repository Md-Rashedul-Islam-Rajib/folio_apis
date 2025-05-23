import { Project } from "@prisma/client";
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

    static async getAllProjects() {
        const result = await prisma.project.findMany()
        return result;
    }

    static async getSingleProject(id: string) {
        const result = await prisma.project.findUnique({
            where: {id}
        })
        return result;
    }

    static async updateProject(id: string, payload: Partial<Project>) {
        const result = await prisma.project.update({
            where: { id },
            data: payload
        })

        return result;
    }

    static async deleteProject(id: string) {
        const result = await prisma.project.delete({ where: { id } });
        return result;
    }
}