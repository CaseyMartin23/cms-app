exports.up = (knex) =>
  knex.schema.createTable("workspaces", (table) => {
    table.increments("id").notNullable();
    table.string("name", 75).notNullable();
    table.uuid("owned_by").unsigned().references("users.id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("workspaces");
