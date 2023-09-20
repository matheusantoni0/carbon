import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, Validate } from "class-validator";

import { None } from "#/libs/strict-monapt";

import { VehiclePartCategory } from "#/modules/vehicle/vehicle-parts/domain/entities/value-objects/vehicle-part-category";
import { VehiclePart } from "#/modules/vehicle/vehicle-parts/domain/entities/vehicle-part";
import { NutritionalValueRequest } from "#/modules/vehicle/vehicle-parts/infrastructure/controllers/requests/nutritional-value-request";

export class CreateVehiclePartRequest {
  @IsNotEmpty()
  @IsString()
  public name!: string;

  @IsNotEmpty()
  @Validate(NutritionalValueRequest)
  @Type(() => NutritionalValueRequest)
  public nutritionalValue!: NutritionalValueRequest;

  @IsNotEmpty()
  @IsEnum(VehiclePartCategory)
  public category!: VehiclePartCategory;

  public toDomain(): VehiclePart {
    return new VehiclePart({
      id: None(),
      name: this.name,
      nutritionalValue: this.nutritionalValue.toDomain(),
      category: this.category,
    });
  }
}
