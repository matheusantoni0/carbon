import { Knex } from "knex";

const tableName = "recipes";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.uuid("id").primary().notNullable();
    table.string("name").notNullable().unique();
    table.float("amount").notNullable();
    table.string("measurement").notNullable();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}

