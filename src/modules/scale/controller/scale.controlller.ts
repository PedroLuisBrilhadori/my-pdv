import { Prix3Fit } from "prix-module";

export default class ScaleController {
  constructor(private scale: Prix3Fit) {}

  async getWeight() {
    return await this.scale.getWeigth();
  }

  async setPrice(price: number) {
    return await this.scale.setPrice(price);
  }
}
