import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, Validate } from "class-validator";

import { None } from "#/libs/strict-monapt";

import { GarageCategory } from "#/modules/garage/domain/entities/value-objects/garage-category";
import { Garage } from "#/modules/garage/domain/entities/garage";
import { NutritionalValueRequest } from "#/modules/garage/infrastructure/controllers/requests/nutritional-value-request";

export class CreateGarageRequest {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @IsNotEmpty()
  @Validate(NutritionalValueRequest)
  @Type(() => NutritionalValueRequest)
  public nutritionalValue!: NutritionalValueRequest;

  @IsNotEmpty()
  @IsEnum(GarageCategory)
  public category!: GarageCategory;

  public toDomain(): Garage {
    return new Garage({
      id: None(),
      name: this.name,
      nutritionalValue: this.nutritionalValue.toDomain(),
      category: this.category,
    });
  }
}
