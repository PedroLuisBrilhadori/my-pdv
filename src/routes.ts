import productRoutes from "@modules/Product/product.routes";
import userRoutes from "@modules/User/user.routes";
import scaleRoutes from "@modules/scale/scale.routes";
import { Router } from "express";
import { verifyToken } from "./middlewares";

export default async () => {
  const routes = Router();

  routes.use("/user", await userRoutes());
  routes.use("/products", verifyToken, await productRoutes());
  routes.use("/scale", await scaleRoutes());

  return routes;
};
