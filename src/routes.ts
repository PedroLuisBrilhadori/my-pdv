import { Router } from "express";
import { verifyToken } from "./middlewares";
import { productRoutes, userRoutes, scaleRoutes } from "@modules/index";

export default async () => {
  const routes = Router();

  routes.use("/user", await userRoutes());
  routes.use("/products", verifyToken, await productRoutes());
  routes.use("/scale", await scaleRoutes());

  return routes;
};
