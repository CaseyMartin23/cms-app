exports.up = (knex) =>
  knex.schema.createTable("project_contributors", (table) => {
    table.increments("id").notNullable();
    table.integer("project_id").unsigned().references("projects.id");
    table.uuid("user_id").unsigned().references("users.id");
    table.timestamp("contributed_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("project_contributors");
