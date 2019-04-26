require('dotenv').config();
const faker = require('faker');
const bcrypt = require('bcryptjs');

function makeUser(i){
  return {
    id: i,
    username: faker.internet.userName(),
    password: bcrypt.hashSync('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode()
  }
}

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      const usersList = [];
      for(let i=0; i<1000; i++){
        usersList.push(makeUser(i))
        console.log(i);
      }
      return knex('users').insert(usersList);
    });
};
