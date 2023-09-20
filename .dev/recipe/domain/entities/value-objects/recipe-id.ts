import { Id } from "#/libs/id/id";

export class RecipeId implements Id<RecipeId> {
  public constructor(private readonly identifier: string) {}

  public equals(recipeId: RecipeId): boolean {
    return this.identifier === recipeId.toString();
  }

  public toString(): string {
    return this.identifier;
  }
}
