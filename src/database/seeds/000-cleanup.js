require('dotenv').config();
const APP_ENV = process.env.APP_ENV || 'development';

exports.seed = async (knex, Promise) => {
  await knex("invitations").del();
  await knex("meetings").del();
  await knex("matches").del();
  await knex("experiences").del();
  await knex("menteeprofiles").del();
  await knex("mentorprofiles").del();
  await knex("notifications").del();
  await knex("users").del();
  await knex("organizations").del();

  // if sqlite 
  if (APP_ENV == "test") {
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='invitations';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='meetings';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='matches';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='experiences';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='menteeprofiles';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='mentorprofiles';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='notifications';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='users';");
  await knex.raw("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='organizations';");
  }

  if (APP_ENV == "development") {
  await knex.raw("ALTER SEQUENCE organizations_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE notifications_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE mentorprofiles_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE menteeprofiles_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE experiences_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE matches_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE meetings_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE invitations_id_seq RESTART WITH 1");
  }
};
