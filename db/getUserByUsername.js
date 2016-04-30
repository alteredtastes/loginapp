const knex = require('./knex');

module.exports = function(username, callback) {
  return knex('users').where('username', username);
}
