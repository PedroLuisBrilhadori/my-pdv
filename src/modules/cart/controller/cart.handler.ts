import { Request, Response } from "express";
import CartController from "./cart.controller";
import defaultError from "@utils/error";

export default class CartHandler {
  constructor(private controller: CartController) {}

  async create(req: Request, res: Response) {
    const { item, clientName } = req.body;

    try {
      const cart = await this.controller.createCart(item, clientName);

      res.status(201).json({
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
