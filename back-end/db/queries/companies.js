const knex = require("../knex.js");
const table = "companies";

module.exports = {
  getById(id) {
    return knex(table).where("id", id);
  },
};
