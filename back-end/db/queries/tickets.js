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
    const tickets = await knex
      .from(table)
      .select("id", "name", "description", "state", "project")
      .where("owned_by", userId);

    const userTickets = await Promise.all(
      tickets.map(async (ticket) => {
        const [ticketProjectName] = await knex
          .from("projects")
          .select("id", "name")
          .where("id", ticket.project);

        return {
          ...ticket,
          project: ticketProjectName,
        };
      })
    );

    return userTickets.sort((currentTicket, previousTicket) => {
      const currentTicketName = currentTicket.name.toLowerCase();
      const previousTicketName = previousTicket.name.toLowerCase();

      return currentTicketName.localeCompare(previousTicketName, undefined, {
        numeric: true,
        ignorePunctuation: true,
      });
    });
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
    await knex(table).insert(ticket);
    return { success: true };
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
