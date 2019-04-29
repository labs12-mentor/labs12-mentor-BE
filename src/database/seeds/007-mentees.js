const faker = require('faker');

function makeMentee(i){
  return {
    id: i,
    user_id: i,
    desired_zip: faker.address.zipCode(),
    lambda_week: Math.round(Math.random()*30, 0),
    interests: faker.random.words(),
    application_answers: faker.random.words(),
    wanted_mentor_id: Math.round(Math.random()*40, 0)
  }
}

exports.seed = function(knex, Promise) {
  return knex('menteeprofiles').del()
    .then(function () {
      const menteesList = [];
      for(let i=0; i<500; i++){
        menteesList.push(makeMentee(i));
        console.log(i);
      }
      console.log("----- Mentees added! -----");
      return knex('menteeprofiles').insert(menteesList);
    });
};
