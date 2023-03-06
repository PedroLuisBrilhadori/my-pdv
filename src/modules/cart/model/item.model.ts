import Product from "@modules/Product/model/product.model";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Cart from "./cart.model";

@Entity("PDV_ITEMS")
export default class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn("uuid")
  cartId: string;

  @Column("numeric", { precision: 5, scale: 2, nullable: false })
  amount: number;

  @ManyToOne(() => Product, (product) => product.items, { eager: true })
  product?: Product;

  @ManyToOne(() => Cart, (cart) => cart.items, { eager: false })
  cart?: Cart;
}
