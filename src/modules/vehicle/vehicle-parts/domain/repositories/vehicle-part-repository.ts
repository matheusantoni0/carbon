import { injectable } from "inversify";

import { Option } from "#/libs/strict-monapt";

import { VehiclePartId } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-id";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";

@injectable()
export abstract class VehiclePartRepository {
  public abstract insert(newVehiclePart: VehiclePart): Promise<void>;

  public abstract getById(id: VehiclePartId): Promise<Option<VehiclePart>>;

  public abstract listAll(): Promise<VehiclePart[]>;
}
