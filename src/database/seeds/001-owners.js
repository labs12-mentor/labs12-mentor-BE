const bcrypt = require('bcryptjs');

function makeOwner(){
  return {
    id: 0,
    username: 'user',
    password: bcrypt.hashSync('password', 10),
    email: 'mentormatch@lambdaschool.com',
    company_name: 'Lambda School'
  }
}

exports.seed = function(knex, Promise) {
  return knex('owners').del()
    .then(function () {
      const owner = makeOwner();
      console.log("----- Owner added! -----");
      return knex('owners').insert(owner);
    });
};
