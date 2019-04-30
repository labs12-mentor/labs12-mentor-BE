const faker = require('faker');

function makeMatch(i){
  return {
    mentor_id: Math.round((Math.random()*1000),0)%10+1,
    mentee_id: i+1,
    status: 'DEFAULT',
    start_date: faker.date.past(1),
    end_date: faker.date.future(1)
  }
}

exports.seed = async (knex, Promise) => {
  const matchesList = [];
  for(let i=0; i<50; i++){
    await matchesList.push(makeMatch(i));
  }
  console.log("----- Matches added! -----");
  return await knex('matches').insert(matchesList);
};
