const faker = require('faker');

function makeMatch(i){
  return {
    id: i,
    mentor_id: Math.round((Math.random()*1000),0)%5,
    mentee_id: i,
    status: 'DEFAULT',
    start_date: faker.date.past(1),
    end_date: faker.date.future(1)
  }
}

exports.seed = function(knex, Promise) {
  return knex('matches').del()
    .then(function () {
      const matchesList = [];
      for(let i=0; i<10; i++){
        matchesList.push(makeMatch(i));
        console.log(i);
      }
      console.log("----- Matches added! -----");
      return knex('matches').insert(matchesList);
    });
};
