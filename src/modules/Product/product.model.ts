import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

export type CreateProduct = {
  name: string;
  price: number;
};

@Entity("Product")
class Product {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;
}

export default Product;
