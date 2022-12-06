import { Request, Response } from "express";
import ProductController from "./product.controller";
import Product from "./product.model";

class ProductHandler {
  constructor(private controller: ProductController) {}

  async create(req: Request, res: Response) {
    const { name, price, photo } = req.body;

    try {
      const product = await this.controller.create({ name, price, photo });

      return res.status(201).json({
        success: true,
        product: {
          ...product,
        },
      });
    } catch (error) {
      if (`${error}`.includes("duplicate key error collection")) {
        return res.status(400).json({ success: false, message: "O Produto já existe." });
      }

      console.error(error);

      return res.status(500).json({ success: false, message: "Ocorreu um erro, tente novamente mais tarde :(" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products: Product[] = await this.controller.findAll();

      return res.status(200).json({
        success: true,
        products: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Ocorreu um erro, tente novamente mais tarde :(" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const product = await this.controller.delete(name);

      return res.status(200).json({
        success: true,
        product: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Ocorreu um erro, tente novamente mais tarde :(" });
    }
  }
}

export default ProductHandler;
