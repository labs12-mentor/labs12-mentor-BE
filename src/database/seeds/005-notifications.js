const faker = require('faker');

function makeNotification(i){
  return {
    user_id: i+1,
    content: faker.lorem.sentence()
  }
}

exports.seed = async (knex, Promise) => {
  const notificationsList = [];
  for(let i=0; i<50; i++){
    await notificationsList.push(makeNotification(i));
  }
  console.log("----- Notifications added! -----");
  return await knex('notifications').insert(notificationsList);
};
