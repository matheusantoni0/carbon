exports.up = (knex) => {
  return knex.schema.createTable("recipe_ingredients", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("amount").notNullable();
    table.string("measurement").notNullable();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt").notNullable();
  });
};

exports.down = (knex) => knex.schema.dropTableIfExists("recipe_ingredients");
