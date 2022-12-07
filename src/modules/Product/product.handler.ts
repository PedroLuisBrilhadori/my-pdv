import { Request, Response } from "express";
import ProductController from "./product.controller";
import Product from "./product.model";

class ProductHandler {
  constructor(private controller: ProductController) {}

  async create(req: Request, res: Response) {
    const { name, price } = req.body;

    try {
      const product = await this.controller.create({ name, price });

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

      const deleteResult = await this.controller.delete(name);

      return res.status(200).json({
        success: true,
        product: {
          name,
        },
        deleteResult,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Ocorreu um erro, tente novamente mais tarde :(" });
    }
  }

  async update(req: Request, res: Response) {
    const { name, price } = req.body;
    const { id } = req.params;

    try {
      const updateResult = await this.controller.update(id, { name, price });

      return res.status(200).json({
        success: true,
        product: {
          id,
          name,
          price,
        },
        updateResult,
      });
    } catch (error) {
      if (`${error}`.includes("duplicate key error collection")) {
        return res.status(400).json({ success: false, message: "O Produto já existe." });
      }

      console.error(error);

      return res.status(500).json({ success: false, message: "Ocorreu um erro, tente novamente mais tarde :(" });
    }
  }
}

export default ProductHandler;
