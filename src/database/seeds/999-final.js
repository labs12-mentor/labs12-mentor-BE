exports.seed = async (knex, Promise) => {
    // await knex('organizations').then(res => console.log(res));
    // await knex('users').then(res => console.log(res));
    // await knex('notifications').then(res => console.log(res));
    // await knex('mentorprofiles').then(res => console.log(res));
    // await knex('menteeprofiles').then(res => console.log(res));
    // await knex('experiences').then(res => console.log(res));
    // await knex('matches').then(res => console.log(res));
    // await knex('meetings').then(res => console.log(res));
    await knex('invitations').then(res => console.log(res));
};
