import { Id } from "#/libs/id/id";
import { Uuid } from "#/libs/uuid";

export class VehicleGarageId implements Id<VehicleGarageId> {
  private readonly identifier: string;

  public constructor(public id?: string) {
    this.identifier = id ?? Uuid.new().toString();
  }

  public equals(id: VehicleGarageId): boolean {
    return this.identifier === id.toString();
  }

  public toString(): string {
    return this.identifier;
  }
}
