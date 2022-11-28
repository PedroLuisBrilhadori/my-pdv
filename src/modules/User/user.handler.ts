import { Request, Response } from "express";
import UserController from "./user.controller";
import * as jwt from "jsonwebtoken";

class UserHandler {
  constructor(private controller: UserController, private bcrypt) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const password_hash = await this.bcrypt.hash(password, 10);
      const user = await this.controller.register({ name, email, password: password_hash });

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "2h" });

      return res.status(201).json({
        success: true,
        user: {
          ...user,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Ocorreu um erro, tente novamente mais tarde :(" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await this.controller.login(email);

      if (!user) {
        return res.status(404).send({ success: false, message: "Usuário não encontrado!" });
      }

      if (!(await this.bcrypt.compare(password, user.password))) {
        return res.status(400).send({ sucess: false, message: "Credenciais do usuário inválidas!" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "2h" });

      res.status(200).send({
        success: true,
        user: {
          ...user,
          password: undefined,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Erro, tente novamente mais tarde :(");
    }
  }
}

export default UserHandler;
