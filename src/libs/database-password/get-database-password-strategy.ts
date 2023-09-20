import { DatabasePassword } from "#/libs/database-password/database-password";

export interface GetDatabasePasswordStrategy {
  get(): Promise<DatabasePassword>;
}
