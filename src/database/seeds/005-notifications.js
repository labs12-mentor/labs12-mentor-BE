const faker = require('faker');

function makeNotification(i){
  return {
    id: i,
    user_id: i,
    content: faker.lorem.sentence()
  }
}

exports.seed = function(knex, Promise) {
  return knex('notifications').del()
    .then(function () {
      const notificationsList = [];
      for(let i=0; i<500; i++){
        notificationsList.push(makeNotification(i));
        console.log(i);
      }
      console.log("----- Notifications added! -----");
      return knex('notifications').insert(notificationsList);
    });
};
