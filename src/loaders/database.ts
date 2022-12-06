import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product, User } from "@modules/index";

dotenv.config();

const AppDataSource = new DataSource({
  name: "default",
  type: "mongodb",
  url: process.env.DB_URL,
  port: 27017,
  database: "test",
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [User, Product],
});

export default AppDataSource;
