const faker = require("faker");

async function makeNotification(i) {
  return {
    user_id: i,
    content: faker.random.words(3)
  };
}

exports.seed = async (knex, Promise) => {
  const notifications = [];
  for (let i = 1; i < 120; i++) {
    await notifications.push(await makeNotification(i));
  }

  console.log("----- NOTIFICATIONS ADDED -----");
  return knex("notifications").insert(notifications);
};
