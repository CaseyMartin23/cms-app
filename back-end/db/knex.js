const knex = require("knex");
const config = require("./knexfile");
const environmentConfig = config[process.env.NODE_ENV || "development"];
const connection = knex(environmentConfig);

module.exports = connection;
