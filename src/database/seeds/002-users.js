require('dotenv').config();
const faker = require('faker');
const bcrypt = require('bcryptjs');

function makeUser(){
  return {
    username: faker.internet.userName(),
    password: bcrypt.hashSync('password', 5),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    role: Math.round(Math.random()*3, 0)
  }
}

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      const usersList = [];
      for(let i=0; i<1000; i++){
        usersList.push(makeUser())
        console.log(i);
      }
      return knex('users').insert(usersList);
    });
};
