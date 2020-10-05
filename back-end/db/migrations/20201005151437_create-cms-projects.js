exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.uuid("id").primary();
    table.string("name", 75);
    table.string("owned_by");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
