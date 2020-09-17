const knex = require("./knex");

type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  remember_me?: boolean;
};

type BasicQueriesType = {
  getAll(): any;
  create(newUser: UserType): any;
  update(updatedUser: UserType): any;
  delete(id: number): any;
};

interface UserQueriesType extends BasicQueriesType {
  getByEmail(email: string): any;
}

type QueriesType = {
  users: UserQueriesType;
  projects: BasicQueriesType;
  tickets: BasicQueriesType;
};

const users: UserQueriesType = {
  getAll() {
    return knex("users");
  },
  async getByEmail(userEmail) {
    return await knex("users").where("email", userEmail);
  },
  create(user) {
    return knex("users").insert(
      { ...user, created_at: new Date().toISOString() },
      "*"
    );
  },
  update(user) {},
  delete() {},
};

const projects: BasicQueriesType = {
  getAll() {},
  create() {},
  update() {},
  delete() {},
};

const tickets: BasicQueriesType = {
  getAll() {},
  create() {},
  update() {},
  delete() {},
};

export const queries: QueriesType = {
  users,
  projects,
  tickets,
};
