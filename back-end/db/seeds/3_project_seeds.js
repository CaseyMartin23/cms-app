const table = "projects";

exports.seed = (knex) => {
  return knex(table)
    .del()
    .then(() =>
      knex(table).insert([
        {
          name: "project1",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 1,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 2,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 1,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 8,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 2,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 1,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 4,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 5,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 3,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 4,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 3,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "48b9ccea-aa00-4caf-ad88-3749c668c45b",
          workspace: 4,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 5,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 3,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 6,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 8,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 6,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 6,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 7,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 7,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 5,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 8,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 2,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: "d936473d-56d0-4df0-9b69-5df4a0b3a1e4",
          workspace: 7,
          project_repo: "https://www.example.com",
        },
      ])
    );
};
