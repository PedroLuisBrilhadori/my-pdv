import productRoutes from "@modules/Product/product.routes";
import userRoutes from "@modules/User/user.routes";
import { Router } from "express";
import { verifyToken } from "./middlewares";

const routes = Router();

routes.use("/user", userRoutes());

routes.use("/products", verifyToken, productRoutes());

export default routes;
