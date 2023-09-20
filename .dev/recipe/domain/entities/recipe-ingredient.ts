import { Option } from "#/libs/strict-monapt";
import { Uuid } from "#/libs/uuid";

import { Measurement } from "#/modules/@common/domain/entities/measurement";
import { Ingredient } from "#/modules/meal/ingredient/domain/entities/ingredient";
import { Cut } from "#/modules/meal/recipe/domain/entities/value-objects/cut";
import { CutSize } from "#/modules/meal/recipe/domain/entities/value-objects/cut-size";

interface IRecipeIngredient {
  id: Option<Uuid>;
  ingredient: Ingredient;
  amount: number;
  measurement: Measurement;
  cut: Cut;
  cutSize: CutSize;
}

export class RecipeIngredient implements IRecipeIngredient {
  public id!: Option<Uuid>;

  public ingredient!: Ingredient;

  public amount!: number;

  public measurement!: Measurement;

  public cut!: Cut;

  public cutSize!: CutSize;

  public constructor(recipeIngredient: IRecipeIngredient) {
    this.id = recipeIngredient.id;
    this.ingredient = recipeIngredient.ingredient;
    this.amount = recipeIngredient.amount;
    this.measurement = recipeIngredient.measurement;
    this.cut = recipeIngredient.cut;
    this.cutSize = recipeIngredient.cutSize;
  }
}
