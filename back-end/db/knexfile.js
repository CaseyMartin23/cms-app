require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DEV_DB_CONNECTION_URL ||
      "postgres://postgres@localhost/cms_db",
  },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }
};
