const table = "tickets";

exports.seed = (knex) => {
  return knex(table)
    .del()
    .then(() => knex(table).insert([]));
};
