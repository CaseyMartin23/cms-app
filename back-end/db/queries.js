const knex = require("./knex");

const users = {
  getAll() {
    return knex("users");
  },
  async getUserByEmail(email) {
    return await knex("users").where("email", email).first();
  },
  async getUserById(id) {
    return await knex("users").where("id", id).first();
  },
  async create(user) {
    const emailAlreadyExists = await knex("users").where({ email: user.email });

    if (emailAlreadyExists.length < 1) {
      const createdUser = await knex("users").insert(
        { ...user, created_at: new Date().toISOString() },
        "*"
      );
      return createdUser[0];
    } else {
      throw new Error("Email Already Exists");
    }
  },
  update(user) {},
  delete() {},
};

const projects = {
  getAll() {},
  create() {},
  update() {},
  delete() {},
};

const tickets = {
  getAll() {},
  create() {},
  update() {},
  delete() {},
};

const queries = {
  users,
  projects,
  tickets,
};

module.exports = queries;
