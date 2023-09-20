import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { None } from "#/libs/strict-monapt";

import { Garage } from "#/modules/garage/domain/entities/garage";
import { GarageCategory } from "#/modules/garage/domain/entities/value-objects/garage-category";

export class CreateGarageRequest {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @IsNotEmpty()
  @IsEnum(GarageCategory)
  public category!: GarageCategory;

  public toDomain(): Garage {
    return new Garage({
      id: None(),
      name: this.name,
      category: this.category,
    });
  }
}
