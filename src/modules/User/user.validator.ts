import { validateSanitizedRequest } from "@middlewares/index";
import { RequestHandler } from "express";
import { body } from "express-validator";

class UserValidator {
  register: RequestHandler[] = [
    body("name")
      .isString()
      .withMessage({ message: "O nome do usuário deve ser do tipo string" })
      .notEmpty()
      .withMessage({ message: "O usuário deve conter um nome" })
      .isLength({ max: 100 })
      .withMessage({ message: "O nome do usuário deve conter no máximo 100 caracteres" }),

    body("email")
      .isString()
      .withMessage({ message: "O email do usuário deve ser do tipo string" })
      .isEmail()
      .withMessage({ message: "O usuário deve conter um email válido" })
      .notEmpty()
      .withMessage({ message: "O usuário deve conter um email" })
      .isLength({ max: 100 })
      .withMessage({ message: "O email do usuário deve conter no máximo 100 caracteres" }),

    body("password")
      .isString()
      .withMessage({ message: "A senha do usuário deve ser do tipo string" })
      .notEmpty()
      .withMessage({ message: "O usuário deve conter uma senha" })
      .isLength({ min: 6, max: 40 })
      .withMessage({ message: "A senha do usuário deve conter no minímo 6 e no máximo 40 caracteres" }),

    validateSanitizedRequest,
  ];

  login: RequestHandler[] = [
    body("email")
      .isString()
      .withMessage({ message: "O email do usuário deve ser do tipo string" })
      .isEmail()
      .withMessage({ message: "O usuário deve conter um email válido" })
      .notEmpty()
      .withMessage({ message: "O usuário deve conter um email" })
      .isLength({ max: 100 })
      .withMessage({ message: "O email do usuário deve conter no máximo 100 caracteres" }),

    body("password")
      .isString()
      .withMessage({ message: "A senha do usuário deve ser do tipo string" })
      .notEmpty()
      .withMessage({ message: "O usuário deve conter uma senha" })
      .isLength({ min: 6, max: 40 })
      .withMessage({ message: "A senha do usuário deve conter no minímo 6 e no máximo 40 caracteres" }),

    validateSanitizedRequest,
  ];
}

export default new UserValidator();
