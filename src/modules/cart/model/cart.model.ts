import Item from "./item.model";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export type AddProduct = {
  name: string;
};

@Entity("PDV_CARTS")
class Cart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { nullable: false, length: "40" })
  name: string;

  @Column("varchar", { nullable: true, length: "40" })
  clientName?: string;

  @OneToMany(() => Item, (item) => item.cart, { eager: true })
  @JoinTable()
  items: Item[];
}

export default Cart;
