const knex = require("../knex");
const table = "tickets";

module.exports = {
  getById(id) {
    return knex(table).where("id", id);
  },
};
