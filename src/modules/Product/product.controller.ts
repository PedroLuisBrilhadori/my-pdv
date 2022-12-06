import { DeleteResult, Repository } from "typeorm";
import Product, { CreateProduct } from "./product.model";

class ProductController {
  constructor(private repository: Repository<Product>) {}

  async create({ name, price, photo }: CreateProduct): Promise<Product> {
    const product = this.repository.create({ name, price, photo });

    await this.repository.save(product);

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find();

    return products;
  }

  async find(name: string): Promise<Product[]> {
    const products = await this.repository.find({ where: { name } });

    return products;
  }

  async delete(name: string): Promise<DeleteResult> {
    const product = await this.repository.delete({ name });

    return product;
  }
}

export default ProductController;
