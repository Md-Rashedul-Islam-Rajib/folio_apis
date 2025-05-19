import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const AuthRoutes: Router = Router();

AuthRoutes.post("/login", AuthControllers.login);

export default AuthRoutes;