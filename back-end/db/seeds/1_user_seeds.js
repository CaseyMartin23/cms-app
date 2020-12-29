const bcrypt = require("bcrypt");
const table = "users";

exports.seed = (knex) => {
  return knex(table)
    .del()
    .then(() =>
      knex(table).insert([
        {
          first_name: "user",
          last_name: "name",
          email: "username@email.com",
          password: bcrypt.hashSync("password", 10),
        },
        {
          first_name: "new",
          last_name: "user",
          email: "newuser@email.com",
          password: bcrypt.hashSync("password", 10),
        },
      ])
    );
};
