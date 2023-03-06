import { Prix3Fit, Prix3FitMock } from "prix-module";
import ScaleController from "./controller/scale.controlller";
import ScaleHandler from "./controller/scale.handler";
import { Router } from "express";

export async function scaleRoutes() {
  const prix = new Prix3Fit(new Prix3FitMock());
  const scaleController = new ScaleController(prix);
  const scaleHandler = new ScaleHandler(scaleController);

  const routes = Router();

  routes.get(`/weight`, (req, res) => scaleHandler.getWeigth(req, res));

  return routes;
}
