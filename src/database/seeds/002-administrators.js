const faker = require('faker');
const bcrypt = require('bcryptjs');

function makeAdministrator(i){
  return {
    username: faker.internet.userName(),
    password: bcrypt.hashSync('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    company_name: faker.company.companyName()
  }
}

exports.seed = async (knex, Promise) => {
  const administratorsList = [];
  for(let i=0; i<1; i++){
    await administratorsList.push(makeAdministrator(i));
  }
  await console.log("----- Administrators added! -----");
  return await knex('administrators').insert(administratorsList);
};
