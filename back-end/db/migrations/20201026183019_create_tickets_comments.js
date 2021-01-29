exports.up = (knex) =>
  knex.schema.createTable("ticket_comments", (table) => {
    table.increments("id").notNullable();
    table
      .integer("ticket_id")
      .unsigned()
      .references("tickets.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .uuid("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("comment").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("ticket_comments");
