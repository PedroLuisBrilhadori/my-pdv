import { Product, User } from "@modules/index";
import AppDataSource from "src/loaders/database";

export const UserRepository = () => AppDataSource.getRepository(User);

export const ProductRepository = () => AppDataSource.getMongoRepository(Product);
