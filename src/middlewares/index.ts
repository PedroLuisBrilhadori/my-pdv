import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import publicRoutes from "../public.routes";

export async function validateSanitizedRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.dir(errors, { depth: null });
    return res.status(400).json({ ok: false, ...errors.array()[0].msg });
  } else {
    next();
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (isPublicRoute(req)) {
    return next();
  }

  if (!token) {
    return res.status(403).send({ success: false, message: "É necessário um token para autenticação" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.body.user = decoded;
  } catch (error) {
    console.error(error);
    return res.status(401).send({ success: false, message: "Token inválido." });
  }

  return next();
}

export function isPublicRoute(req: Request) {
  const { baseUrl, method } = req;

  const route = publicRoutes.filter((route) => route.route.includes(baseUrl) && method === route.method);

  if (route.length) return true;

  return false;
}
