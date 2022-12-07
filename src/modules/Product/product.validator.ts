import { validateSanitizedRequest } from "@middlewares/index";
import { RequestHandler } from "express";
import { body } from "express-validator";

class ProductValidator {
  create: RequestHandler[] = [
    body("name")
      .isString()
      .withMessage({ message: "O nome do produto deve ser uma string" })
      .notEmpty()
      .withMessage({ message: "O nome do produto não pode estar vazio" })
      .isLength({ max: 150 })
      .withMessage({
        message: "O nome do produto deve conter no máximo 150 caracteres ",
      }),

    body("price").notEmpty().withMessage("O produto deve conter um preço").isNumeric().withMessage("O preço do produto deve ser um número"),

    validateSanitizedRequest,
  ];

  delete: RequestHandler[] = [
    body("name")
      .isString()
      .withMessage({ message: "O nome do produto deve ser uma string" })
      .notEmpty()
      .withMessage({ message: "O nome do produto não pode estar vazio" })
      .isLength({ max: 150 })
      .withMessage({
        message: "O nome do produto deve conter no máximo 150 caracteres ",
      }),

    validateSanitizedRequest,
  ];

  update: RequestHandler[] = [
    body("name")
      .isString()
      .withMessage({ message: "O nome do produto deve ser uma string" })
      .notEmpty()
      .withMessage({ message: "O nome do produto não pode estar vazio" })
      .isLength({ max: 150 })
      .withMessage({
        message: "O nome do produto deve conter no máximo 150 caracteres ",
      }),

    body("price").notEmpty().withMessage("O produto deve conter um preço").isNumeric().withMessage("O preço do produto deve ser um número"),

    validateSanitizedRequest,
  ];
}

export default new ProductValidator();
