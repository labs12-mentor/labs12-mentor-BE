const faker = require('faker');

async function makeExperience(i) {
    return {
        name: faker.random.words(3),
        user_id: i
    };
}

exports.seed = async (knex, Promise) => {
    const experiences = [];
    for (let i = 2; i < 320; i++) {
        await experiences.push(await makeExperience(i));
    }

    console.log('----- EXPERIENCES ADDED -----');
    return knex('experiences').insert(experiences);
};
