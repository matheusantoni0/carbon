import { DATABASE_PASSWORD } from "#/configs/env/settings";

import { DatabasePassword } from "#/libs/database-password/database-password";
import { GetDatabasePasswordStrategy } from "#/libs/database-password/get-database-password-strategy";

export class DefaultPasswordStrategy implements GetDatabasePasswordStrategy {
  public async get(): Promise<DatabasePassword> {
    return new DatabasePassword(DATABASE_PASSWORD);
  }
}
