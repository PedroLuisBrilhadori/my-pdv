/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import HttpStatusCode from "./http-status-code";

/**
 * @param res Response express
 * @param error error from try/catch
 * @param name route name
 * @returns response with error.
 */
export default function defaultError(res: Response, error: any, name?: string) {
  if (process.env.DEBUG) console.error(error || error?.error);

  if (error?.status === "pdv-error") {
    return res.status(error?.httpStatus | HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error?.message,
    });
  }

  if (`${error}`.includes("duplicate key error collection")) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ success: false, message: `Erro, o ${name || `recurso`} já existe.` });
  }

  return res.status(HttpStatusCode.BAD_REQUEST).json({
    success: false,
    message: `Ocorreu um erro, tente novamente mais tarde :(`,
  });
}

export class PdvError {
  httpStatus: HttpStatusCode;
  status: "pdv-error";
  message: string;
  error: any;

  constructor({ status, message, error, httpStatus }: { status: "pdv-error"; message: string; error?: any; httpStatus: HttpStatusCode }) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.httpStatus = httpStatus;
  }
}
