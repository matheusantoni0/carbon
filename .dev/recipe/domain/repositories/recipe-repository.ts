
import { injectable } from "inversify";

import { Option } from "#/libs/strict-monapt";

import { Recipe } from "#/modules/meal/recipe/domain/entities/recipe";
import { RecipeModel } from "#/modules/meal/recipe/infrastructure/objections/models/recipe-model";

@injectable()
export abstract class RecipeRepository {
  public abstract insert(recipe: Recipe): Promise<void>;

  public abstract getById(id: string): Promise<Option<RecipeModel>>;
}
