const knex = require("../knex");
const table = "users";

module.exports = {
  async getById(id) {
    try {
      return await knex(table).where("id", id);
    } catch (err) {
      return err;
    }
  },
  async getEmailById(id) {
    try {
      const [username] = await knex.from(table).select("email").where("id", id);
      return username.email;
    } catch (err) {
      console.error(err);
    }
  },
  async getByEmail(email) {
    try {
      return await knex(table).where("email", email);
    } catch (err) {
      return err;
    }
  },
  async createUser(user) {
    try {
      await knex(table).insert(user);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        error: err,
        success: false,
      };
    }
  },
  async updateUser(id, newUser) {
    try {
      await knex(table).where("id", id).update(newUser);
    } catch (err) {
      return err;
    }
  },
  async deleteUser(id) {
    try {
      await knex(table).where("id", id).del();
    } catch (err) {
      return err;
    }
  },
};
