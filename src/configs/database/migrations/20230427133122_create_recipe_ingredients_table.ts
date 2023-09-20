import { Knex } from "knex";

const tableName = "recipe_ingredients";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.uuid("id").primary().notNullable();
    table.float("amount").notNullable();
    table.string("cut").notNullable();
    table.string("cutSize").notNullable();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}

