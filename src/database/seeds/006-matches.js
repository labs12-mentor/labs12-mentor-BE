const faker = require('faker');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function makeMatch(mentor, mentee) {
    return {
        status: 'AVAILABLE',
        mentor_id: mentor,
        mentee_id: mentee
    };
}

exports.seed = async (knex, Promise) => {
    const mentors = [...Array(50).keys()];
    const mentees = shuffle([...Array(50).keys()]);
    const matches = [];
    for (let i = 0; i < 50; i++) {
        await matches.push(await makeMatch(mentors[i] + 1, mentees[i] + 1));
    }

    console.log('----- MATCHES ADDED -----');
    return knex('matches').insert(matches);
};
