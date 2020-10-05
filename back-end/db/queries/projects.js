const knex = require("../knex");
const table = "projects";

module.exports = {
  getById(id) {
    return knex(table).where("id", id);
  },
};
