import productRoutes from "@modules/Product/product.routes";
import userRoutes from "@modules/User/user.routes";
import { Router } from "express";

const routes = Router();

routes.use("/user", userRoutes());

routes.use("/products", productRoutes());

export default routes;
