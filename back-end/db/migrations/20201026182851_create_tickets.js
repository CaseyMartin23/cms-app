const { table } = require("../knex");

exports.up = (knex) =>
  knex.schema.createTable("tickets", (table) => {
    table.increments("id").notNullable();
    table.string("title", 75).notNullable();
    table.string("description").nullable();
    table.integer("ticket_time").nullable();
    table.integer("project").unsigned().references("projects.id").notNullable();
    table.uuid("owned_by").unsigned().references("users.id").notNullable();
    table.string("ticket_repo").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("tickets");
