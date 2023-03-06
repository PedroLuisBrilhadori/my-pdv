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

  async createCart({ name, items, clientName }: { name: string; items?: Item[]; clientName?: string }) {
    try {
      let cart = this.repositories.cart.create({ name, clientName });

      await this.repositories.cart.save(cart);
      await this.repositories.item.query("DBCC CHECKIDENT (pdv_items, RESEED, 0);");

      if (items) cart = await this.addItems(cart, items);

      return cart;
    } catch (error) {
      throw new PdvError({ status: "pdv-error", message: "O produto não existe.", error });
    }
  }

  async addItems(cart: Cart, items: Item[]) {
    for (let item of items) {
      item = this.getItem(cart, item.product, item.amount);
      cart = await this.addItem(item);
    }
    return cart;
  }

  async addItem(item: Item) {
    const cart = await this.findOne(item.cart.id);

    try {
      cart.items.push(item);
    } catch (error) {
      cart.items = [item];
    }

    await this.repositories.cart.save(cart);
    await this.repositories.item.save(item);

    const lastItem = cart.items.pop();
    cart.items = [...cart.items, { ...lastItem, cart: undefined }];

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
