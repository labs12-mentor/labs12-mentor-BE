const faker = require('faker');

async function makeMeeting(i) {
    return {
        match_id: (i % 50) + 1,
        content: faker.random.words(5)
    };
}

exports.seed = async (knex, Promise) => {
    const meetings = [];
    for (let i = 0; i < 150; i++) {
        await meetings.push(await makeMeeting(i));
    }

    console.log('----- MEETINGS ADDED -----');
    return knex('meetings').insert(meetings);
};
