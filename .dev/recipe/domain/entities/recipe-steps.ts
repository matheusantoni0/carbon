
import { Option } from "#/libs/strict-monapt";
import { Uuid } from "#/libs/uuid";

import { Ingredient } from "#/modules/meal/ingredient/domain/entities/ingredient";

interface IRecipeSteps {
  id: Uuid;
  ingredient: Option<Ingredient>;
  order: number;
  description: string;
  timer: number;
}

export class RecipeSteps implements IRecipeSteps {
  public id!: Uuid;

  public ingredient!: Option<Ingredient>;

  public order!: number;

  public description!: string;

  public timer!: number;

  public constructor(recipeSteps: IRecipeSteps) {
    this.id = recipeSteps.id;
    this.ingredient = recipeSteps.ingredient;
    this.order = recipeSteps.order;
    this.description = recipeSteps.description;
    this.timer = recipeSteps.timer;
  }
}
