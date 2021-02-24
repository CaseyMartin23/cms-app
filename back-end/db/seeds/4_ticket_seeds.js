const knex = require("../knex");
const table = "tickets";

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
          name: "ticket1",
          description:
            "Test ticket!\nFor test user username@gmail.com\nabout project1",
          project: 1,
          owned_by: userIdList[0],
        },
        {
          name: "ticket2",
          description:
            "Test ticket!\nFor test user username@gmail.com\nabout project1",
          project: 1,
          owned_by: userIdList[0],
        },
        {
          name: "ticket3",
          description:
            "Test ticket!\nFor test user username@gmail.com\nabout project1",
          project: 1,
          owned_by: userIdList[0],
        },
      ])
    );
};
