import { Measurement } from "#/modules/@common/domain/entities/measurement";
import { RecipeIngredient } from "#/modules/meal/recipe/domain/entities/recipe-ingredient";
import { RecipeId } from "#/modules/meal/recipe/domain/entities/value-objects/recipe-id";

interface IRecipe {
  id: RecipeId;
  name: string;
  recipeIngredients: RecipeIngredient[];
  portionAmount: number;
  measurement: Measurement;
}

export class Recipe implements IRecipe {
  public id: RecipeId;

  public name: string;

  public recipeIngredients: RecipeIngredient[];

  public portionAmount: number;

  public measurement: Measurement;

  public constructor(recipe: IRecipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.recipeIngredients = recipe.recipeIngredients;
    this.portionAmount = recipe.portionAmount;
    this.measurement = recipe.measurement;
  }
}
