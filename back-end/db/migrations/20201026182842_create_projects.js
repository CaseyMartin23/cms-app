exports.up = (knex) =>
  knex.schema.createTable("projects", (table) => {
    table.increments("id").notNullable();
    table.string("name", 75).notNullable();
    table.uuid("owned_by").unsigned().references("users.id");
    table.integer("workspace").unsigned().references("workspaces.id");
    table.string("project_repo").nullable();
    table.timestamp("created_by").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("projects");
