import { Blog } from "@prisma/client";
import prisma from "../../config/prisma";
import { TBlog } from "./blogs.type";


export class BlogServices {
  static async createBlog(payload: TBlog) {
    console.log({ payload });
    const result = await prisma.blog.create({
      data: payload,
    });

    return result;
  }

  static async getAllBlogs() {
    const result = await prisma.blog.findMany();
    return result;
  }

  static async getSingleBlog(id: string) {
    const result = await prisma.blog.findUnique({
      where: {id}
    })
    return result;
  }

  static async updateBlog(id: string, payload: Partial<Blog>) {
    const result = await prisma.blog.update({
      where: { id },
      data:payload
    })
    return result;
  }
}
