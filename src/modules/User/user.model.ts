import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

@Entity("User")
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
