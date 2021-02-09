const knex = require("../knex");
const queryProjects = require("./projects");
const queryUsers = require("./users");
const table = "workspaces";

module.exports = {
  async getWorkspaceById(id) {
    const workspace = await knex
      .from(table)
      .select("id", "name", "owned_by")
      .where("id", id);

    const [workspaceAndProject] = await Promise.all(
      workspace.map(async (workspace) => {
        const workspaceProjects = await queryProjects.getProjectsByWorkspaceId(
          workspace.id
        );
        const workspaceOwner = await queryUsers.getEmailById(
          workspace.owned_by
        );

        return {
          ...workspace,
          projects: workspaceProjects,
          owned_by: workspaceOwner,
        };
      })
    );

    return workspaceAndProject;
  },
  async getWorkspaceNamesAndIdByUserId(userId) {
    const workspaces = await knex
      .from(table)
      .select("id", "name")
      .where("owned_by", userId);

    return workspaces.sort((currentWorkspace, previousWorkspace) => {
      const currentWorkspaceName = currentWorkspace.name.toLowerCase();
      const previousWorkspaceName = previousWorkspace.name.toLowerCase();

      if (currentWorkspaceName < previousWorkspaceName) return -1;
      if (currentWorkspaceName > previousWorkspaceName) return 1;
      return 0;
    });
  },
  async getWorkspacesByUserId(userId) {
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

    return userWorkspaces.sort((currentWorkspace, previousWorkspace) => {
      const currentWorkspaceName = currentWorkspace.name.toLowerCase();
      const previousWorkspaceName = previousWorkspace.name.toLowerCase();

      if (currentWorkspaceName < previousWorkspaceName) return -1;
      if (currentWorkspaceName > previousWorkspaceName) return 1;
      return 0;
    });
  },
  async createWorkspace(workspace) {
    await knex(table).insert(workspace);
    return { response: "Workspace creation successful" };
  },
  async updateWorkspace(newWorkspace) {
    await knex(table).where("id", newWorkspace.id).update(newWorkspace);
    return { response: "Workspace update successful" };
  },
  async updateWorkspaceName(updatedWorkspace) {
    await knex(table)
      .where("id", updatedWorkspace.id)
      .update("name", updatedWorkspace.name);

    return { response: "Workspace name update successful" };
  },
  async deleteWorkspace(id) {
    await knex(table).where("id", id).del();
    return { response: "Workspace deletion successful" };
  },
};
