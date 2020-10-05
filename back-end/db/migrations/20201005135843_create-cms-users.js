exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary();
    table.string("firstName", 75);
    table.string("lastName", 75);
    table.string("email", 75);
    table.string("password");
    table.string("user_role", 20);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
