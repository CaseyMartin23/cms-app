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
      return { response: "Successfully created user!!!" };
    } catch (err) {
      console.log(err);
      return {
        error: err,
        response: "There was a problem with creating user",
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
