const knex = require("../knex");
const table = "projects";
const queryTickets = require("./tickets");
const queryWorkspaces = require("./workspaces");

module.exports = {
  async getProjectById(id) {
    try {
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
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async getProjectsByUserId(userId) {
    try {
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

      const sortProjectsByWorkspace = () => {
        const sortedProjects = userProjects.sort(
          (currentProject, previousProject) => {
            if (
              currentProject.workspace.name.toLowerCase() <
              previousProject.workspace.name.toLowerCase()
            ) {
              return -1;
            }
            if (
              currentProject.workspace.name.toLowerCase() >
              previousProject.workspace.name.toLowerCase()
            ) {
              return 1;
            }

            return 0;
          }
        );
        return sortedProjects;
      };

      return sortProjectsByWorkspace();
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
