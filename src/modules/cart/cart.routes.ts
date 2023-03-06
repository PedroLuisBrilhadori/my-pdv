import AppDataSource from "src/loaders/database";
import Cart from "./model/cart.model";
import CartController from "./controller/cart.controller";
import CartHandler from "./controller/cart.handler";
import { Router } from "express";
import Item from "./model/item.model";

export async function cartRoutes() {
  const cart = (await AppDataSource).getRepository(Cart);
  const item = (await AppDataSource).getRepository(Item);
  const controller = new CartController({ cart, item });
  const handler = new CartHandler(controller);

  const routes = Router();

  routes.get("/", (req, res) => handler.getAll(req, res));
  routes.get("/:id", (req, res) => handler.getCart(req, res));
  routes.post("/create", (req, res) => handler.create(req, res));
  routes.post("/:id", (req, res) => handler.addItems(req, res));
  routes.delete("/:cartId/:itemId", (req, res) => handler.remmoveItem(req, res));

  return routes;
}
