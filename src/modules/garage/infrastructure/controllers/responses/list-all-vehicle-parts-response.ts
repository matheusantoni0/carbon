import { instanceToPlain } from "class-transformer";

import { GarageCategory } from "#/modules/garage/domain/entities/value-objects/garage-category";
import { Garage } from "#/modules/garage/domain/entities/garage";

interface IListAllGaragesResponse {
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

export class ListAllGaragesResponse {
  public constructor(private readonly garages: Garage[]) {}

  public toPlain(): Array<Record<string, IListAllGaragesResponse>> {
    const allGarages = this.garages.map((garage) => {
      const plain = instanceToPlain(garage);

      Object.assign(plain, {
        id: garage.id.getOrThrow().toString(),
        nutritionalValue: {
          ...garage.nutritionalValue,
          id: garage.nutritionalValue.id.getOrThrow().toString(),
        },
      });
      return plain;
    });

    return allGarages;
  }
}
