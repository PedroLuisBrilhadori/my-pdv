import { DeleteResult, Repository, UpdateResult } from "typeorm";
import Product, { CreateProduct } from "../model/product.model";

class ProductController {
  constructor(private repository: Repository<Product>) {}

  async create({ name, price, unit }: CreateProduct): Promise<Product> {
    const product = this.repository.create({ name, price, unit });

    await this.repository.save(product);

    return product;
  }

  async findAll(order): Promise<Product[]> {
    const products = await this.repository.find({
      order,
    });

    return products;
  }

  async findOne(name: string): Promise<Product> {
    const products = await this.repository.findOne({ where: { name } });

    return products;
  }

  async delete(name: string): Promise<DeleteResult> {
    const product = await this.repository.delete({ name });

    return product;
  }

  async update(name: string, price: number, unit: boolean): Promise<UpdateResult> {
    const product = await this.repository.update(name, { price, unit });

    return product;
  }
}

export default ProductController;
