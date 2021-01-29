const knex = require("../knex");
const table = "workspaces";

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
          name: "workspace1",
          owned_by: userIdList[0],
        },
        {
          name: "workspace2",
          owned_by: userIdList[0],
        },
        {
          name: "workspace3",
          owned_by: userIdList[0],
        },
        {
          name: "workspace4",
          owned_by: userIdList[0],
        },
        {
          name: "workspace5",
          owned_by: userIdList[1],
        },
        {
          name: "workspace6",
          owned_by: userIdList[1],
        },
        {
          name: "workspace7",
          owned_by: userIdList[1],
        },
        {
          name: "workspace8",
          owned_by: userIdList[1],
        },
      ])
    );
};
