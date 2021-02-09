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
  async getTicketsByUserId(userId) {
    try {
      const tickets = await knex
        .from(table)
        .select("id", "name", "description", "state", "project")
        .where("id", userId);
      const userTickets = await Promise.all(
        tickets.map(async (ticket) => {
          const [ticketProjectName] = await knex
            .from("projects")
            .select("id", "name")
            .where("id", ticket.project);
          return {
            ...tickets,
            project: ticketProjectName,
          };
        })
      );
      return userTickets.sort((currentTicket, previousTicket) => {
        const currentProjectName = currentTicket.project.name.toLowerCase();
        const previousProjectName = previousTicket.project.name.toLowerCase();

        if (currentProjectName < previousProjectName) return -1;
        if (currentProjectName > previousProjectName) return 1;
        return 0;
      });
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async getTicketByProjectId(projectId) {
    try {
      return await knex
        .from(table)
        .select("id", "name", "description", "state")
        .where("project", projectId);
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async createTicket(ticket) {
    try {
      await knex(table).insert(ticket);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async updateTicket(newTicket) {
    try {
      await knex(table).where("id", newTicket.id).update(newTicket);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
  async deleteTicket(ticketId) {
    try {
      await knex(table).where("id", ticketId).del();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  },
};
