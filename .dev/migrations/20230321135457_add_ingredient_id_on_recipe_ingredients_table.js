exports.up = (knex) => {
  return knex.schema.createTable("ingredients", (table) => {
    table.uuid("id").primary().notNullable();
    table.string("name").notNullable().unique();
    table.string("category").notNullable();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt").notNullable();
  });
};

exports.down = (knex) => knex.schema.dropTableIfExists("ingredients");
