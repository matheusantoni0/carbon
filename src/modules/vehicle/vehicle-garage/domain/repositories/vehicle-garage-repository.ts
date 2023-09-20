import { injectable } from "inversify";

import { Option } from "#/libs/strict-monapt";

import { VehicleGarageId } from "#/modules/vehicle/vehicle-garage/domain/entities/value-objects/vehicle-garage-id";
import { VehicleGarage } from "#/modules/vehicle/vehicle-garage/domain/entities/vehicle-garage";

@injectable()
export abstract class VehicleGarageRepository {
  public abstract insert(newVehicleGarage: VehicleGarage): Promise<void>;

  public abstract getById(id: VehicleGarageId): Promise<Option<VehicleGarage>>;

  public abstract listAll(): Promise<VehicleGarage[]>;
}
