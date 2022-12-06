import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { UserRepository } from "../../repositories";
import UserController from "./user.controller";
import UserHandler from "./user.handler";
import UserValidator from "./user.validator";

const repository = UserRepository();
const userController = new UserController(repository);
const userHandler = new UserHandler(userController, bcrypt);

bcrypt;

export default () => {
  const routes = Router();

  routes.post(`/register`, UserValidator.register, (req: Request, res: Response) => {
    return userHandler.register(req, res);
  });

  routes.post("/login", UserValidator.login, (req: Request, res: Response) => {
    return userHandler.login(req, res);
  });

  return routes;
};
