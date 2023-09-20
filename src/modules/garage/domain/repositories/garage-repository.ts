import { injectable } from "inversify";

import { Option } from "#/libs/strict-monapt";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";

@injectable()
export abstract class GarageRepository {
  public abstract insert(newGarage: Garage): Promise<void>;

  public abstract getById(id: GarageId): Promise<Option<Garage>>;

  public abstract listAll(): Promise<Garage[]>;
}
