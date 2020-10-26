exports.up = (knex) =>
  knex.schema.createTable("assigned_ticket", (table) => {
    table.increments("id").notNullable();
    table.integer("ticket_id").unsigned().references("tickets.id");
    table.uuid("user_id").unsigned().references("users.id");
    table.timestamp("assigned_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("assigned_tickets");
