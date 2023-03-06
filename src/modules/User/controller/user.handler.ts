import { Request, Response } from "express";
import UserController from "./user.controller";
import * as jwt from "jsonwebtoken";
import defaultError from "@utils/error";
import HttpStatusCode from "@utils/http-status-code";

class UserHandler {
  constructor(private controller: UserController, private bcrypt) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const password_hash = await this.bcrypt.hash(password, 10);
      const user = await this.controller.register({ name, email, password: password_hash });

      const token = jwt.sign({ userId: user.name, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "2h" });

      return res.status(HttpStatusCode.CREATED).json({
        success: true,
        user: {
          ...user,
          token,
        },
      });
    } catch (error) {
      return defaultError(res, error, "Usuário");
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.controller.login(email);

      if (!user) {
        return res.status(HttpStatusCode.NOT_FOUND).send({ success: false, message: "Usuário não encontrado!" });
      }

      if (!(await this.bcrypt.compare(password, user.password))) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({ sucess: false, message: "Credenciais do usuário inválidas!" });
      }

      const token = jwt.sign({ userId: user.name, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "2h" });

      res.status(HttpStatusCode.OK).send({
        success: true,
        user: {
          ...user,
          password: undefined,
          token,
        },
      });
    } catch (error) {
      return defaultError(res, error, "Usuário");
    }
  }
}

export default UserHandler;
