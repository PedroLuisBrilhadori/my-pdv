import { Product, User } from "@modules/index";
import AppDataSource from "../loaders/database";

export const UserRepository = () => AppDataSource.getRepository(User);

export const ProductRepository = () => AppDataSource.getMongoRepository(Product);
