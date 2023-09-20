import { Knex } from "knex";

const tableName = "nutritional_values";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.uuid("ingredientId").unsigned().index().references("id").inTable("ingredients");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("ingredientId");
  });
}
