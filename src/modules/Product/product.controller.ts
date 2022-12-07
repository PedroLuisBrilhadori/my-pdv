import { DeleteResult, Repository, UpdateResult } from "typeorm";
import Product, { CreateProduct } from "./product.model";

class ProductController {
  constructor(private repository: Repository<Product>) {}

  async create({ name, price }: CreateProduct): Promise<Product> {
    const product = this.repository.create({ name, price });

    await this.repository.save(product);

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.find();

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

  async update(id: string, { name, price }: CreateProduct): Promise<UpdateResult> {
    const product = await this.repository.update(id, { name, price });

    return product;
  }
}

export default ProductController;
