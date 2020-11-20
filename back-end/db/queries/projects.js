const knex = require("../knex");
const table = "projects";

module.exports = {
  async getProjectsById(id) {
    try {
      return await knex(table).where("id", id);
    } catch (err) {
      console.error(err);
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
    }
  },
  async getProjectsByWorkspaceId(workspaceId) {
    try {
      return await knex(table).where("workspace", workspaceId);
    } catch (err) {
      console.error(err);
    }
  },
  async createProject(project) {
    try {
      await knex(table).insert(project);
      return { response: "Project creation successful" };
    } catch (err) {
      console.error(err);
    }
  },
  async updateProject(newProject) {
    try {
      const projectId = newProject.id;
      await knex(table).where("id", projectId).update(newProject);
      return { response: "Project update successful" };
    } catch (err) {
      console.error(err);
    }
  },
  async deleteProject(projectId) {
    try {
      await knex(table).where("id", projectId).del();
      return { response: "Project deletion successful" };
    } catch (err) {
      console.error(err);
    }
  },
};
