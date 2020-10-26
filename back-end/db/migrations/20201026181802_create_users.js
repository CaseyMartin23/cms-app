exports.up = (knex) =>
  knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(() =>
    knex.schema.createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("first_name", 75);
      table.string("last_name", 75);
      table.string("email");
      table.string("password");
      table.timestamp("created_by").defaultTo(knex.fn.now());
    })
  );

exports.down = (knex) =>
  knex.schema
    .dropTable("users")
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
