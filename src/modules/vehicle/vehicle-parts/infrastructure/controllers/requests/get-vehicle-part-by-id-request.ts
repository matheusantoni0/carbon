import { IsString } from "class-validator";

export class GetVehiclePartByIdRequest {
  @IsString()
  public id!: string;
}
