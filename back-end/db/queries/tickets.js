const knex = require("../knex");
const table = "tickets";

module.exports = {
  async getTicketById(id) {
    try {
      return await knex(table).where("id", id);
    } catch (err) {
      console.error(err);
    }
  },
  // async getTicketByProject(projectId) {
  //   try {
  //     return await knex(table)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
};
