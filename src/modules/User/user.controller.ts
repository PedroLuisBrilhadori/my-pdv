import { Repository } from "typeorm";
import User, { CreateUser } from "./user.model";

class UserController {
  constructor(private repository: Repository<User>) {}

  async register({ name, email, password }: CreateUser): Promise<User> {
    const user = this.repository.create({ name, email, password });
    await this.repository.save(user);

    user.password = undefined;

    return user;
  }

  async login(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }
}

export default UserController;
