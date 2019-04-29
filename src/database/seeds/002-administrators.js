const faker = require('faker');
const bcrypt = require('bcryptjs');

function makeAdministrator(i){
  return {
    id: i,
    username: faker.internet.userName(),
    password: bcrypt.hashSync('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    company_name: faker.company.companyName()
  }
}

exports.seed = function(knex, Promise) {
  return knex('administrators').del()
    .then(function () {
      const administratorsList = [];
      for(let i=0; i<1; i++){
        administratorsList.push(makeAdministrator(i));
        console.log(i);
      }
      console.log("----- Administrators added! -----");
      return knex('administrators').insert(administratorsList);
    });
};
