const faker = require('faker');

async function makeMatch(i){
  return {
    status: 'AVAILABLE',
    mentor_id: i,
    mentee_id: i
  }
}

exports.seed = async (knex, Promise) => {
  const matches = [];
  for(let i=1; i<10; i++){
    await matches.push(await makeMatch(i));
  }

  console.log('----- MATCHES ADDED -----');
  return knex('matches').insert(matches);
};