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
    zipcode: faker.address.zipCode(),
    role_id: Math.round(Math.random()*3, 0)
  }
}

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      const usersList = [];
      for(let i=0; i<500; i++){
        usersList.push(makeUser(i))
        console.log(i);
      }
      return knex('users').insert(usersList);
    });
};
