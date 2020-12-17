const knex = require("../knex");
const table = "projects";

module.exports = {
  async getProjectsById(id) {
    try {
      return await knex(table).where("id", id);
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async getProjectsByUserId(userId) {
    try {
      return await knex
        .from(table)
        .select("id", "name")
        .where("owned_by", userId);
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async getProjectsByWorkspaceId(workspaceId) {
    try {
      return await knex(table).where("workspace", workspaceId);
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async createProject(project) {
    try {
      await knex(table).insert(project);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async updateProject(newProject) {
    try {
      const projectId = newProject.id;
      await knex(table).where("id", projectId).update(newProject);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async deleteProject(projectId) {
    try {
      await knex(table).where("id", projectId).del();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
};
