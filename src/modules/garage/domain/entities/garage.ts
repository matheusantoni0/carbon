import { Option } from "#/libs/strict-monapt";

import { GarageCategory } from "#/modules/garage/domain/entities/value-objects/garage-category";
import { GarageId } from "#/modules/garage/domain/entities/value-objects/garage-id";

interface IGarage {
  id: Option<GarageId>;
  name: string;
  category: GarageCategory;
}

export class Garage implements IGarage {
  public id: Option<GarageId>;

  public name: string;

  public category: GarageCategory;

  public constructor(garage: IGarage) {
    this.id = garage.id;
    this.name = garage.name;
    this.category = garage.category;
  }
}
