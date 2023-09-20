/* eslint-disable max-statements, max-lines-per-function */
import { Knex } from "knex";

const tableName = "nutritional_values";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid("id").primary().notNullable();
    table.float("calories").notNullable();
    table.float("carbohydrate").notNullable();
    table.float("protein").notNullable();
    table.float("fiberFeed").notNullable();
    table.float("saturatedFat").notNullable();
    table.float("monounsaturatedFat").notNullable();
    table.float("polyunsaturatedFat").notNullable();
    table.float("cholesterol").notNullable();
    table.float("vitaminA").notNullable();
    table.float("vitaminB").notNullable();
    table.float("vitaminB1").notNullable();
    table.float("vitaminB12").notNullable();
    table.float("vitaminB2").notNullable();
    table.float("vitaminB3").notNullable();
    table.float("vitaminB5").notNullable();
    table.float("vitaminB6").notNullable();
    table.float("vitaminC").notNullable();
    table.float("vitaminD").notNullable();
    table.float("vitaminE").notNullable();
    table.float("vitaminK").notNullable();
    table.float("calcium").notNullable();
    table.float("copper").notNullable();
    table.float("iron").notNullable();
    table.float("magnesium").notNullable();
    table.float("manganese").notNullable();
    table.float("phosphor").notNullable();
    table.float("potassium").notNullable();
    table.float("sodium").notNullable();
    table.float("selenium").notNullable();
    table.float("zinc").notNullable();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
/* eslint-enable max-statements, max-lines-per-function */
