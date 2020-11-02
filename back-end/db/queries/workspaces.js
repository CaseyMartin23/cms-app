const knex = require("../knex");
const table = "workspaces";

module.exports = {
  getById(id) {
    return knex(table).where("id", id);
  },
};
