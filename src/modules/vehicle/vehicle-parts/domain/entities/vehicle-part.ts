import { Option } from "#/libs/strict-monapt";

import { NutritionalValue } from "#/modules/vehicle/vehicle-parts/domain/entities/nutritional-value";
import { VehiclePartCategory } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-category";
import { VehiclePartId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-id";

interface IVehiclePart {
  id: Option<VehiclePartId>;
  name: string;
  category: VehiclePartCategory;
  nutritionalValue: NutritionalValue;
}

export class VehiclePart implements IVehiclePart {
  public id: Option<VehiclePartId>;

  public name: string;

  public category: VehiclePartCategory;

  public nutritionalValue: NutritionalValue;

  public constructor(vehiclePart: IVehiclePart) {
    this.id = vehiclePart.id;
    this.name = vehiclePart.name;
    this.category = vehiclePart.category;
    this.nutritionalValue = vehiclePart.nutritionalValue;
  }

  public static toDomain(vehiclePart: IVehiclePartPrimitive): VehiclePart {
    const nutritionalValue = NutritionalValue.toDomain(vehiclePart.nutritionalValue);
    return new VehiclePart({
      id: Option(new VehiclePartId(vehiclePart.id)),
      name: vehiclePart.name,
      category: vehiclePart.category,
      nutritionalValue,
    });
  }
}
