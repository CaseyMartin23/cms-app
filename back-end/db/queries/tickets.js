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
  async getTicketByProjectId(projectId) {
    try {
      return await knex
        .from(table)
        .select("id", "name")
        .where("project", projectId);
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
};
