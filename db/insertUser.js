const knex = require('./knex');
const bcrypt = require('bcrypt');

module.exports = function(user) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      knex('users').insert(user).catch(function(e) {
        console.log(e);
      }).then(function(data) {
        return data;
      });
    });
  });
}
