const bcrypt = require('bcryptjs');

function makeOwner(){
  return {
    username: 'user',
    password: bcrypt.hashSync('password', 10),
    email: 'mentormatch@lambdaschool.com',
    company_name: 'Lambda School'
  }
}

exports.seed = async (knex, Promise) => {
  const owner = await makeOwner();
  await console.log("----- Owner added! -----");
  return await knex('owners').insert(owner);
};
