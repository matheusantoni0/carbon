import { IsString } from "class-validator";

export class GetGarageByIdRequest {
  @IsString()
  public id!: string;
}
