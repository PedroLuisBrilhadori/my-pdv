import { ProductRepository } from "@repositories";
import { Request, Response, Router } from "express";
import ProductController from "./product.controller";
import ProductHandler from "./product.handler";
import productValidator from "./product.validator";
import ProductValidator from "./product.validator";

const repository = ProductRepository();
const productController = new ProductController(repository);
const productHandler = new ProductHandler(productController);

export default () => {
  const routes = Router();

  routes.post(`/create`, ProductValidator.create, (req: Request, res: Response) => productHandler.create(req, res));
  routes.post(`/delete`, productValidator.delete, (req: Request, res: Response) => productHandler.delete(req, res));

  routes.get(`/`, (req: Request, res: Response) => productHandler.getAll(req, res));

  return routes;
};
