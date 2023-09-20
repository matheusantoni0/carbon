import { IsUUID } from "class-validator";

export class GetRecipeByIdRequest {
  @IsUUID()
  public id!: string;
}
