import { Response } from "express";

/**
 * @param res Response express
 * @param error error from try/catch
 * @param name route name
 * @returns response with error.
 */
export default function defaultError(res: Response, error: any, name?: string) {
  if (process.env.DEBUG) console.error(error || error?.error);

  if (error?.status === "pdv-error") {
    return res.status(400).json({
      success: false,
      message: error?.message,
    });
  }

  if (`${error}`.includes("duplicate key error collection")) {
    return res.status(400).json({ success: false, message: `Erro, o ${name || `recurso`} já existe.` });
  }

  return res.status(400).json({
    success: false,
    message: `Ocorreu um erro, tente novamente mais tarde :(`,
  });
}

export class PdvError {
  status: "pdv-error";
  message: string;
  error: any;

  constructor({ status, message, error }: { status: "pdv-error"; message: string; error?: any }) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
