const faker = require('faker');

async function makeInvitation(i){
  return {
    organization_id: 1,
    user_id: i,
    role: 'USER'
  }
}

exports.seed = async (knex, Promise) => {
  const invitations = [];
  for(let i=1; i<10; i++){
    await invitations.push(await makeInvitation(i));
  }

  console.log('----- INVITATIONS ADDED -----');
  return knex('invitations').insert(invitations);
};