const faker = require('faker');
const bcrypt = require('bcryptjs');

async function makeAdmin(){
  return {
    email: 'user@example.org',
    password: bcrypt.hashSync('password', 10),
    first_name: 'Test',
    last_name: 'User',
    street: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: faker.address.zipCode(),
    country: faker.address.country(),
    role: 'ADMINISTRATOR',
    organization_id: null
  }
}

async function makeUser(i, role){
  return {
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    street: faker.address.streetName(),
    city: faker.address.city(),
    state: faker.address.state(),
    zipcode: faker.address.zipCode(),
    country: faker.address.country(),
    role: role,
    organization_id: 1
  }
}

exports.seed = async (knex, Promise) => {
  const users = [];
  await users.push(await makeAdmin());
  console.log('----- ADMINISTRATOR ADDED -----');
  for(let i=0; i<10; i++){
    await users.push(await makeUser(i, 'OWNER'));
  }
  console.log('----- OWNERS ADDED -----');
  
  for(let i=0; i<10; i++){
    await users.push(await makeUser(i, 'MANAGER'));
  }
  console.log('----- MANAGERS ADDED -----');

  for(let i=0; i<100; i++){
    await users.push(await makeUser(i, 'USER'));
  }

  console.log('----- USERS ADDED -----');
  return knex('users').insert(users);
};