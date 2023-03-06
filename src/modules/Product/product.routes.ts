import { Request, Response, Router } from "express";
import ProductController from "./controller/product.controller";
import ProductHandler from "./controller/product.handler";
import productValidator from "./model/product.validator";
import ProductValidator from "./model/product.validator";
import AppDataSource from "src/loaders/database";
import Product from "./model/product.model";

export async function productRoutes() {
  const repository = (await AppDataSource).getRepository(Product);
  const productController = new ProductController(repository);
  const productHandler = new ProductHandler(productController);

  const routes = Router();

  routes.post(`/`, ProductValidator.create, (req: Request, res: Response) => productHandler.create(req, res));
  routes.put(`/:name`, productValidator.update, (req: Request, res: Response) => productHandler.update(req, res));
  routes.delete(`/:name`, (req: Request, res: Response) => productHandler.delete(req, res));
  routes.get(`/`, (req: Request, res: Response) => productHandler.getAll(req, res));

  return routes;
}
