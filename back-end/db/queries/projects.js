const knex = require("../knex");
const queryTickets = require("./tickets");
const table = "projects";

module.exports = {
  async getProjectById(id) {
    const projects = await knex
      .from(table)
      .select("id", "name", "workspace", "owned_by", "project_repo")
      .where("id", id);

    const [projectAndTickets] = await Promise.all(
      projects.map(async (project) => {
        const projectTickets = await queryTickets.getTicketByProjectId(
          project.id
        );
        const [workspace] = await knex
          .from("workspaces")
          .select("name")
          .where("id", project.workspace);

        const [ownedBy] = await knex
          .from("users")
          .select("email")
          .where("id", project.owned_by);
        return {
          ...project,
          owned_by: ownedBy.email,
          workspace: workspace.name,
          tickets: projectTickets,
        };
      })
    );

    return projectAndTickets;
  },
  async getProjectsByUserId(userId) {
    const projects = await knex
      .from(table)
      .select("id", "name", "workspace")
      .where("owned_by", userId);

    const userProjects = await Promise.all(
      projects.map(async (project) => {
        const projectTickets = await queryTickets.getTicketByProjectId(
          project.id
        );
        const [projectWorkspaceName] = await knex
          .from("workspaces")
          .select("id", "name")
          .where("id", project.workspace);

        return {
          ...project,
          tickets: projectTickets,
          workspace: projectWorkspaceName,
        };
      })
    );

    return userProjects.sort((currentProject, previousProject) => {
      const currentWorkspaceName = currentProject.name.toLowerCase();
      const previousWorkspaceName = previousProject.name.toLowerCase();

      if (currentWorkspaceName < previousWorkspaceName) return -1;
      if (currentWorkspaceName > previousWorkspaceName) return 1;
      return 0;
    });
  },
  async getProjectsByWorkspaceId(workspaceId) {
    return await knex
      .from(table)
      .select("id", "name")
      .where("workspace", workspaceId);
  },
  async createProject(project) {
    await knex(table).insert(project);
    return { response: "Project creation successful" };
  },
  async updateProject(newProject) {
    await knex(table).where("id", newProject.id).update(newProject);
    return { response: "Project update successful" };
  },
  async updateProjectName(projectId, newName) {
    await knex(table).where("id", projectId).update("name", newName);
    return { response: "Project name update successful" };
  },
  async deleteProject(projectId) {
    await knex(table).where("id", projectId).del();
    return { response: "Project deletion successful" };
  },
};
