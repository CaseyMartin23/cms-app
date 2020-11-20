const knex = require("../knex");
const queryProjects = require("./projects");
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
      const workspaces = await knex
        .from(table)
        .select("id", "name")
        .where("owned_by", userId);

      console.log("All-User-Workspaces->", workspaces);

      const userWorkspaces = await Promise.all(
        workspaces.map(async (workspace) => {
          const workspaceProjects = await queryProjects.getProjectsByWorkspaceId(
            workspace.id
          );
          console.log("workspaceProjects->", workspaceProjects);

          return {
            ...workspace,
            projects: workspaceProjects,
          };
        })
      );

      console.log("userWorkspaces->", userWorkspaces);
      return userWorkspaces;
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
