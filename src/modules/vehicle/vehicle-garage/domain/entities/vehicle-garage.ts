import { Option } from "#/libs/strict-monapt";

import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";
import { VehicleGarageCategory } from "#/modules/vehicle/vehicle-garage/domain/entities/value-objects/vehicle-garage-category";
import { VehicleGarageId } from "#/modules/vehicle/vehicle-garage/domain/entities/value-objects/vehicle-garage-id";

interface IVehicleGarage {
  id: Option<VehicleGarageId>;
  garageId: GarageId;
  name: string;
  category: VehicleGarageCategory;
}

export class VehicleGarage implements IVehicleGarage {
  public id: Option<VehicleGarageId>;

  public name: string;

  public garageId: GarageId;

  public category: VehicleGarageCategory;

  public constructor(vehicleGarage: IVehicleGarage) {
    this.id = vehicleGarage.id;
    this.garageId = vehicleGarage.garageId;
    this.name = vehicleGarage.name;
    this.category = vehicleGarage.category;
  }
}
