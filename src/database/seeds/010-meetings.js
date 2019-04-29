const faker = require('faker');

function makeMeeting(i){
  return {
    id: i,
    match_id: i,
    meeting_date: faker.date.future(1),
    location: faker.address.city(),
    notes: faker.random.words(5),
    rating: Math.floor((Math.random()*5))
  }
}

exports.seed = function(knex, Promise) {
  return knex('meetings').del()
    .then(function () {
      const meetingsList = [];
      for(let i=0; i<500; i++){
        meetingsList.push(makeMeeting(i));
        console.log(i);
      }
      console.log("----- Meetings added! -----");
      return knex('meetings').insert(meetingsList);
    });
};
