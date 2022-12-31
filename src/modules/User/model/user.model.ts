import { Column, Entity, PrimaryColumn } from "typeorm";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

@Entity("DD_USERS")
class User {
  @PrimaryColumn()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
