const faker = require('faker');

function makeExperience(i){
  return {
    user_id: i+1,
    name: faker.random.words()
  }
}

exports.seed = async (knex, Promise) => {
  const experiencesList = [];
  for(let i=0; i<50; i++){
    await experiencesList.push(makeExperience(i));
  }
  console.log("----- Experiences added! -----");
  return await knex('experiences').insert(experiencesList);
};
