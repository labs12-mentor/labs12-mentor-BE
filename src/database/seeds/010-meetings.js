const faker = require('faker');

function makeMeeting(i){
  return {
    match_id: i+1,
    meeting_date: faker.date.future(1),
    location: faker.address.city(),
    notes: faker.random.words(5),
    rating: Math.floor((Math.random()*5))
  }
}

exports.seed = async (knex, Promise) => {
  const meetingsList = [];
  for(let i=0; i<50; i++){
    await meetingsList.push(makeMeeting(i));
  }
  console.log("----- Meetings added! -----");
  return await knex('meetings').insert(meetingsList);
};
