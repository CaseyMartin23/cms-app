const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile");
const configedEnvironment = config[environment];
const knex = require("knex");
const connection = knex(configedEnvironment);

export = connection;
