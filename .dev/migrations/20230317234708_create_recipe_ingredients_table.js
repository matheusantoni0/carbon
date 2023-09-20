/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable("recipe_ingredients", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("recipeId").notNullable();
    table.string("ingredientId").notNullable();
    table.numeric("amount").notNullable();
    table.string("measurement").notNullable();
    table.string("cut").notNullable();
    table.string("cutSize").notNullable();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("recipe_ingredients");
};
