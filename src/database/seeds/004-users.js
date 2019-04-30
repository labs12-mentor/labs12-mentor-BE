const faker = require('faker');
const bcrypt = require('bcryptjs');

function makeUser(i){
  return {
    username: faker.internet.userName(),
    password: bcrypt.hashSync('password', 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    organization_id: 1
  }
}

exports.seed = async (knex, Promise) => {
  const usersList = [];
  for(let i=0; i<50; i++){
    await usersList.push(makeUser(i));
  }
  console.log("----- Users added! -----");
  return await knex('users').insert(usersList);
};
