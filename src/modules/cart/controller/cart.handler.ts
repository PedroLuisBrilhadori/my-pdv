import { Request, Response } from "express";
import CartController from "./cart.controller";
import defaultError from "@utils/error";

export default class CartHandler {
  constructor(private controller: CartController) {}

  async create(req: Request, res: Response) {
    const { name, items, clientName } = req.body;

    try {
      const cart = await this.controller.createCart({ name, items, clientName });

      res.status(201).json({
        success: true,
        cart,
      });
    } catch (error) {
      defaultError(res, error, "Carrinho");
    }
  }

  async addItems(req: Request, res: Response) {
    const { items } = req.body;
    const { id } = req.params;

    try {
      const cart = await this.controller.addItems({ id }, items);

      res.status(201).json({
        success: true,
        cart,
      });
    } catch (error) {
      defaultError(res, error, "Carrinho");
    }
  }

  async remmoveItem(req: Request, res: Response) {
    const { cartId, itemId } = req.params;

    try {
      const cart = await this.controller.removeItem(cartId, itemId);

      res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      defaultError(res, error, "Carrinho");
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const carts = await this.controller.findAll();

      res.status(200).json({
        success: true,
        carts,
      });
    } catch (error) {
      defaultError(res, error);
    }
  }

  async getCart(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const cart = await this.controller.findOne(id);

      res.status(200).json({
        success: true,
        cart,
      });
    } catch (error) {
      defaultError(res, error);
    }
  }
}
