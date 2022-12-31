import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { StringUtils } from "@utils/string";

dotenv.config();

const AppDataSource = new DataSource({
  name: "default",
  type: "mssql",
  host: process.env.BD_HOST,
  username: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  port: Number(process.env.BD_PORT),
  database: process.env.BD_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/modules/**/model/*.model{.ts,.js}", "dist/modules/**/model/*.model{.ts,.js}"],
  extra: {
    trustServerCertificate: true,
  },
})
  .initialize()
  .then((dataSource) => {
    console.log(`${StringUtils.app} | Banco de dados sincronizado!`);
    return dataSource;
  })
  .catch((error) => {
    throw new Error(`[Erro] | O servidor não foi iniciado. \nCódigo do erro: \n${error}`);
  });

export default AppDataSource;
