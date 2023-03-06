import Cart from "../model/cart.model";
import Item from "../model/item.model";
import { Repository } from "typeorm";
import { PdvError } from "@utils/error";
import Product from "@modules/Product/model/product.model";

export default class CartController {
  constructor(private repositories: { cart: Repository<Cart>; item: Repository<Item> }) {}

  async findOne(id: string) {
    const cart = await this.repositories.cart.findOne({ where: { id } });

    if (!cart) throw new PdvError({ status: "pdv-error", message: "Compra não existente" });

    return cart;
  }

  async findAll() {
    return await this.repositories.cart.find();
  }

  async delete(id: string) {
    return await this.repositories.cart.delete({ id });
  }

  async createCart(name: string, product: Product, amount: number, clientName?: string) {
    if (!product) throw new PdvError({ status: "pdv-error", message: "É necessário adicionar um produto para criar um carrinho." });

    try {
      const cart = this.repositories.cart.create({ name, clientName });
      const item = this.getItem(cart, product, amount);

      await this.repositories.cart.save(cart);
      await this.repositories.item.save(item);
      await this.repositories.item.query("DBCC CHECKIDENT (pdv_items, RESEED, 0);");

      cart.items = [{ ...item, cart: undefined }];

      return cart;
    } catch (error) {
      throw new PdvError({ status: "pdv-error", message: "O produto não existe.", error });
    }
  }

  async additem(id: string, item: Item) {
    const cart = await this.findOne(id);
    cart.items.push(item);

    await this.repositories.cart.save(cart);

    return cart;
  }

  async removeitem(id: string, productName: string) {
    const cart = await this.findOne(id);
    cart.items = cart.items.filter((item) => item.product.name !== productName);

    await this.repositories.cart.save(cart);

    return cart;
  }

  private getItem(cart: Cart, product: Product, amount: number) {
    const item = new Item();
    item.amount = amount;
    item.cart = cart;
    item.product = product;

    return item;
  }
}
