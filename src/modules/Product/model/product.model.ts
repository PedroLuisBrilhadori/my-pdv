import { Column, Entity, PrimaryColumn } from "typeorm";

export type CreateProduct = {
  name: string;
  price: number;
};

@Entity("PDV_PRODUCTS")
class Product {
  @PrimaryColumn({ unique: true })
  name: string;

  @Column("numeric", { precision: 5, scale: 2 })
  price: number;
}

export default Product;
