const knex = require("../knex");
const queryProjects = require("./projects");
const table = "workspaces";

module.exports = {
  async getWorkspaceById(id) {
    try {
      const workspace = await knex
        .from(table)
        .select("id", "name", "owned_by")
        .where("id", id);

      const [workspaceAndProject] = await Promise.all(
        workspace.map(async (workspace) => {
          const workspaceProjects = await queryProjects.getProjectsByWorkspaceId(
            workspace.id
          );
          return { ...workspace, projects: workspaceProjects };
        })
      );

      return workspaceAndProject;
    } catch (err) {
      console.error(err);
    }
  },
  async getWorkspaceNamesAndIdByUserId(userId) {
    try {
      const workspaces = await knex
        .from(table)
        .select("id", "name")
        .where("owned_by", userId);
      return { success: true, user_workspaces: workspaces };
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

      const userWorkspaces = await Promise.all(
        workspaces.map(async (workspace) => {
          const workspaceProjects = await queryProjects.getProjectsByWorkspaceId(
            workspace.id
          );
          return { ...workspace, projects: workspaceProjects };
        })
      );

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
  async updateWorkspaceName(updatedWorkspace) {
    try {
      const workspaceId = updatedWorkspace.id;
      await knex(table)
        .where("id", workspaceId)
        .update("name", updatedWorkspace.name);
    } catch (err) {
      console.log(err);
    }
  },
  async deleteWorkspace(id) {
    try {
      await knex(table).where("id", id).del();
      return { success: true };
    } catch (err) {
      console.error(err);
    }
  },
};
