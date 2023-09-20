import { v4 as uuidv4 } from "uuid";

export class Uuid {
  private static readonly pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  public constructor(private readonly identifier: string) {
    if (!Uuid.pattern.test(identifier)) {
      throw new TypeError("Tried to assign an invalid UUID");
    }
  }

  public static new(): Uuid {
    return new Uuid(uuidv4());
  }

  public equals(uuid: Uuid): boolean {
    return this.toString() === uuid.toString();
  }

  public toString(): string {
    return this.identifier;
  }
}
