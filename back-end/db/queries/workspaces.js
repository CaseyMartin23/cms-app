const knex = require("../knex");
const table = "workspaces";

module.exports = {
  async getWorkspacesById(id) {
    try {
      return await knex(table).where("id", id);
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
  async updateWorkspace(id, newWorkspace) {
    try {
      await knex(table).where("id", id).update(newWorkspace);
    } catch (err) {
      console.error(err);
    }
  },
  async deleteWorkspace(id) {
    try {
      await knex(table).where("id", id).del();
    } catch (err) {
      console.error(err);
    }
  },
};
