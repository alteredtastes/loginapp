const knex = require('./knex');

module.exports = function(user) {
  return knex('users').select('name', 'username', 'email', 'password').where(user);
}
