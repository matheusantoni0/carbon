import { DatabasePassword } from "#/libs/database-password/database-password";
import { DefaultPasswordStrategy } from "#/libs/database-password/default-database-password-strategy";
import { GetDatabasePasswordStrategy } from "#/libs/database-password/get-database-password-strategy";

export class CreateDatabasePassword {
  public constructor(
    private readonly defaultStrategy: GetDatabasePasswordStrategy = new DefaultPasswordStrategy(),
  ) {}

  public async get(): Promise<DatabasePassword> {
    return this.defaultStrategy.get();
  }
}
