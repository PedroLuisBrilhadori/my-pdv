import { Request, Response } from "express";
import ProductController from "./product.controller";
import Product from "../model/product.model";
import defaultError from "@utils/error";

class ProductHandler {
  constructor(private controller: ProductController) {}

  async create(req: Request, res: Response) {
    const { name, price, unit } = req.body;

    try {
      const product = await this.controller.create({ name, price, unit });

      return res.status(201).json({
        success: true,
        product: {
          ...product,
        },
      });
    } catch (error) {
      return defaultError(res, error, "Produto");
    }
  }

  async getAll(req: Request, res: Response) {
    const { name, price } = req.query;

    try {
      const products: Product[] = await this.controller.findAll({ name, price });

      return res.status(200).json({
        success: true,
        products: products,
      });
    } catch (error) {
      return defaultError(res, error, "Produto");
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { name } = req.params;

      const deleteResult = await this.controller.delete(name);

      return res.status(200).json({
        success: true,
        product: {
          name,
        },
        deleteResult,
      });
    } catch (error) {
      return defaultError(res, error, "Produto");
    }
  }

  async update(req: Request, res: Response) {
    const { price, unit } = req.body;
    const { name } = req.params;

    try {
      const updateResult = await this.controller.update(name, price, unit);

      return res.status(200).json({
        success: true,
        product: {
          name,
          price,
        },
        updateResult,
      });
    } catch (error) {
      return defaultError(res, error, "Produto");
    }
  }
}

export default ProductHandler;
