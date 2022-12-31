import "reflect-metadata";
import * as dotenv from "dotenv";

import { StringColors, StringUtils } from "@utils/string";

import App from "./loaders/app";
import routes from "./routes";

dotenv.config();

export const start = async () => {
  try {
    console.log(`${StringUtils.app} | O Servidor está iniciando...`);

    const app = App().app;

    app.use("/api", await routes());

    app.listen(process.env.PORT || 3000, () => {
      console.log(`${StringUtils.app} | O Servidor foi iniciado: ${StringColors.yellow}http://localhost:${process.env.PORT || 3000}${StringColors.null}`);
    });
  } catch (error) {
    throw new Error(`[Erro] | O servidor não foi iniciado. \nCódigo do erro: \n${error}`);
  }
};

start();

const app = App().app;

export { app };
