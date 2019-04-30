const faker = require('faker');

function makeMentee(i){
  return {
    user_id: i+1,
    desired_zip: faker.address.zipCode(),
    lambda_week: Math.round(Math.random()*30, 0),
    interests: faker.random.words(),
    application_answers: faker.random.words(),
    wanted_mentor_id: i%10+1
  }
}

exports.seed = async (knex, Promise) => {
  const menteesList = [];
  for(let i=0; i<50; i++){
    await menteesList.push(makeMentee(i));
  }
  console.log("----- Mentees added! -----");
  return await knex('menteeprofiles').insert(menteesList);
};
