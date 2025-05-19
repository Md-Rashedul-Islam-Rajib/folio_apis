import { Router } from "express";
import { UserControllers } from "./user.controller";


const UserRoutes: Router = Router();

UserRoutes.post('/', UserControllers.createUser);

export default UserRoutes;