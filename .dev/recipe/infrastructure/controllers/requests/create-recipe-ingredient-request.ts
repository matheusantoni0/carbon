
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { Measurement } from "#/modules/@common/domain/entities/measurement";
import { Cut } from "#/modules/meal/recipe/domain/entities/value-objects/cut";
import { CutSize } from "#/modules/meal/recipe/domain/entities/value-objects/cut-size";

export class CreateRecipeIngredientRequest {
  @IsNotEmpty()
  @IsString()
  public ingredientId!: string;

  @IsNotEmpty()
  @IsNumber()
  public amount!: number;

  @IsNotEmpty()
  @IsEnum(Measurement)
  public measurement!: Measurement;

  @IsNotEmpty()
  @IsEnum(Cut)
  public cut!: Cut;

  @IsNotEmpty()
  @IsEnum(CutSize)
  public cutSize!: CutSize;
}
