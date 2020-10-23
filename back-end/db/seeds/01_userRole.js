exports.seed = function (knex) {
  return knex("user_roles")
    .del()
    .then(function () {
      return knex("user_roles").insert([{ role: "admin" }, { role: "basic" }]);
    });
};
