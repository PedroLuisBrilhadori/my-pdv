import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import UserController from "./controller/user.controller";
import UserHandler from "./controller/user.handler";
import UserValidator from "./model/user.validator";
import AppDataSource from "src/loaders/database";
import User from "./model/user.model";

export default async () => {
  const repository = (await AppDataSource).getRepository(User);
  const userController = new UserController(repository);
  const userHandler = new UserHandler(userController, bcrypt);
  const routes = Router();

  routes.post(`/register`, UserValidator.register, (req: Request, res: Response) => {
    return userHandler.register(req, res);
  });

  routes.post("/login", UserValidator.login, (req: Request, res: Response) => {
    return userHandler.login(req, res);
  });

  return routes;
};
