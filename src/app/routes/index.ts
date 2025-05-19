import { Router } from 'express';
import ProjectRoutes from '../modules/projects/projects.route';
import BlogRoutes from '../modules/blogs/blogs.route';
import SkillRoutes from '../modules/skills/skills.route';
import UserRoutes from '../modules/users/users.route';
import AuthRoutes from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes
  },
  {
    path: '/skills',
    route: SkillRoutes
  },
  {
    path: '/users',
    route: UserRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
