const knex = require("../knex");
const table = "projects";

let userIdList;

const getUserIds = async () => {
  await knex
    .from("users")
    .select("id")
    .then((res) => {
      userIdList = res.map((user) => user.id);
    });
};
getUserIds();

exports.seed = (knex) => {
  return knex(table)
    .del()
    .then(() =>
      knex(table).insert([
        {
          name: "project1",
          owned_by: userIdList[0],
          workspace: 1,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[0],
          workspace: 1,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[0],
          workspace: 1,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[0],
          workspace: 2,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[0],
          workspace: 2,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[0],
          workspace: 2,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[0],
          workspace: 3,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[0],
          workspace: 3,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[0],
          workspace: 3,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[0],
          workspace: 4,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[0],
          workspace: 4,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[0],
          workspace: 4,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[1],
          workspace: 5,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[1],
          workspace: 5,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[1],
          workspace: 5,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[1],
          workspace: 6,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[1],
          workspace: 6,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[1],
          workspace: 6,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[1],
          workspace: 7,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[1],
          workspace: 7,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[1],
          workspace: 7,
          project_repo: "https://www.example.com",
        },
        {
          name: "project1",
          owned_by: userIdList[1],
          workspace: 8,
          project_repo: "https://www.example.com",
        },
        {
          name: "project2",
          owned_by: userIdList[1],
          workspace: 8,
          project_repo: "https://www.example.com",
        },
        {
          name: "project3",
          owned_by: userIdList[1],
          workspace: 8,
          project_repo: "https://www.example.com",
        },
      ])
    );
};
