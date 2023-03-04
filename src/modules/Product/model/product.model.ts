import { BooleanTransformer } from "@utils/transformers";
import { Column, Entity, PrimaryColumn } from "typeorm";

export type CreateProduct = {
  name: string;
  price: number;
  unit?: boolean;
};

@Entity("PDV_PRODUCTS")
class Product {
  @PrimaryColumn({ unique: true })
  name: string;

  @Column("numeric", { precision: 5, scale: 2 })
  price: number;

  @Column("numeric", {
    precision: 1,
    scale: 0,
    nullable: true,
    transformer: new BooleanTransformer(),
  })
  unit?: boolean;
}

export default Product;
