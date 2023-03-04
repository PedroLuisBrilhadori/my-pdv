import defaultError from "@utils/error";
import ScaleController from "./scale.controlller";
import { Request, Response } from "express";

export default class ScaleHandler {
  constructor(private controller: ScaleController) {}

  async getWeigth(req: Request, res: Response) {
    try {
      const weight = await this.controller.getWeight();

      return res.status(200).json({
        success: true,
        weight,
      });
    } catch (error) {
      defaultError(res, error);
    }
  }

  async setPrice(req: Request, res: Response) {
    const { price } = req.body;

    try {
      await this.controller.setPrice(price);

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      defaultError(res, error);
    }
  }
}
