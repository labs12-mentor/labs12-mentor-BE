exports.seed = async (knex, Promise) => {
    await knex('meetings').del();
    await knex('matches').del();
    await knex('experiences').del();
    await knex('menteeprofiles').del();
    await knex('mentorprofiles').del();
    await knex('notifications').del();
    await knex('users').del();
    await knex('organizations').del();

    await knex.raw('ALTER SEQUENCE organizations_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE notifications_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE mentorprofiles_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE menteeprofiles_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE experiences_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE matches_id_seq RESTART WITH 1');
    await knex.raw('ALTER SEQUENCE meetings_id_seq RESTART WITH 1');
};
