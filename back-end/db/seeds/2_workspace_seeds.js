const table = "workspaces";

exports.seed = (knex) => {
  return knex(table)
    .del()
    .then(() =>
      knex(table).insert([
        {
          name: "workspace1",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
        },
        {
          name: "workspace2",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
        },
        {
          name: "workspace3",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
        },
        {
          name: "workspace4",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
        },
        {
          name: "workspace5",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
        },
        {
          name: "workspace6",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
        },
        {
          name: "workspace7",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
        },
        {
          name: "workspace8",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
        },
      ])
    );
};
