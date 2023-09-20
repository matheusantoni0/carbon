import { instanceToPlain } from "class-transformer";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageCategory } from "#/modules/garage/domain/entities/value-objects/garage-category";

interface IGetVehicleGarageByIdResponse {
  id: string;
  name: string;
  nutritionalValue: {
    id: string;
    calories: number;
    saturatedFat: number;
    monounsaturatedFat: number;
    polyunsaturatedFat: number;
    carbohydrate: number;
    protein: number;
    fiberFeed: number;
    cholesterol: number;
    vitaminA: number;
    vitaminB: number;
    vitaminB1: number;
    vitaminB12: number;
    vitaminB2: number;
    vitaminB3: number;
    vitaminB5: number;
    vitaminB6: number;
    vitaminC: number;
    vitaminD: number;
    vitaminE: number;
    vitaminK: number;
    calcium: number;
    copper: number;
    iron: number;
    magnesium: number;
    manganese: number;
    phosphor: number;
    potassium: number;
    sodium: number;
    selenium: number;
    zinc: number;
  };
  category: GarageCategory;
}

export class GetVehicleGarageByIdResponse {
  public constructor(private readonly garage: Garage) {}

  public toPlain(): Record<string, IGetVehicleGarageByIdResponse> {
    const plain = instanceToPlain(this.garage);

    Object.assign(plain, {
      id: this.garage.id.getOrThrow().toString(),
      nutritionalValue: this.garage.nutritionalValue,
    });

    return plain;
  }
}
