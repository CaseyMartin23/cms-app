exports.up = function (knex) {
  return knex.schema.createTable("tickets", (table) => {
    table.uuid("id").primary();
    table.string("title", 100);
    table.string("description");
    table.string("owned_by");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tickets");
};
