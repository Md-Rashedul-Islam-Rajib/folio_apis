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
}
