const faker = require('faker');

function makeExperience(i){
  return {
    id: i,
    user_id: i,
    name: faker.random.words()
  }
}

exports.seed = function(knex, Promise) {
  return knex('experiences').del()
    .then(function () {
      const experiencesList = [];
      for(let i=0; i<10; i++){
        experiencesList.push(makeExperience(i));
        console.log(i);
      }
      console.log("----- Experiences added! -----");
      return knex('experiences').insert(experiencesList);
    });
};
