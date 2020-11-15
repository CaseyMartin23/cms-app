const knex = require("../knex");
const table = "workspaces";

module.exports = {
  async getWorkspaceById(id) {
    try {
      return await knex.from(table).select("id", "name").where("id", id);
    } catch (err) {
      console.error(err);
    }
  },
  async getWorkspacesByUserId(userId) {
    try {
      return await knex
        .from(table)
        .select("id", "name")
        .where("owned_by", userId);
    } catch (err) {
      console.error(err);
    }
  },
  async createWorkspace(workspace) {
    try {
      await knex(table).insert(workspace);
      return { response: "Workspace creation successful" };
    } catch (err) {
      console.error(err);
    }
  },
  async updateWorkspace(newWorkspace) {
    try {
      const workspaceId = newWorkspace.id;
      await knex(table).where("id", workspaceId).update(newWorkspace);
      return { response: "Workspace update successful" };
    } catch (err) {
      console.error(err);
    }
  },
  async deleteWorkspace(id) {
    try {
      await knex(table).where("id", id).del();
      return { response: "Workspace deletion successful" };
    } catch (err) {
      console.error(err);
    }
  },
};
