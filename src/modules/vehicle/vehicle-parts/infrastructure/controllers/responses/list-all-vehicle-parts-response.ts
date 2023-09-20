import { instanceToPlain } from "class-transformer";

import { VehiclePartCategory } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-category";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";

interface IListAllVehiclePartsResponse {
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
  category: VehiclePartCategory;
}

export class ListAllVehiclePartsResponse {
  public constructor(private readonly vehicleParts: VehiclePart[]) {}

  public toPlain(): Array<Record<string, IListAllVehiclePartsResponse>> {
    const allVehicleParts = this.vehicleParts.map((vehiclePart) => {
      const plain = instanceToPlain(vehiclePart);

      Object.assign(plain, {
        id: vehiclePart.id.getOrThrow().toString(),
        nutritionalValue: {
          ...vehiclePart.nutritionalValue,
          id: vehiclePart.nutritionalValue.id.getOrThrow().toString(),
        },
      });
      return plain;
    });

    return allVehicleParts;
  }
}
