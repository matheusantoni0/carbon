import { Knex } from "knex";

const tableName = "recipe_ingredients";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.uuid("recipeId").unsigned().index().references("id").inTable("recipes");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("recipeId");
  });
}
