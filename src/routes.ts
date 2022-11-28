import userRoutes from "@modules/User/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRoutes());

export default routes;
