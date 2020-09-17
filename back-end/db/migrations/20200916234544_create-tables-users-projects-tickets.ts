import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("first_name", 65);
      table.string("last_name", 65);
      table.string("email", 65);
      table.boolean("remember_me");
      table.string("password");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    })
    .createTable("projects", (table) => {
      table.increments("id");
      table.string("name", 65);
      table.integer("owned_by");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    })
    .createTable("tickets", (table) => {
      table.increments("id");
      table.integer("created_by");
      table.string("title", 65);
      table.string("description");
      table.string("status", 15);
      table.integer("seconds_spent");
      table.string("activity", 20);
      table.string("repo_url");
      table.timestamp("started_at");
      table.timestamp("ended_at");
      table.timestamp("paused_at");
      table.timestamp("unpaused_at");
      table.timestamp("created_at");
      table.timestamp("updated_at");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("users")
    .dropTable("projects")
    .dropTable("tickets");
}
