import User from "@modules/User/user.model";
import AppDataSource from "src/loaders/database";

export const UserRepository = () => AppDataSource.getRepository(User);
