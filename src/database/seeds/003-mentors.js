async function makeMentor(i) {
    return {
        user_id: i,
        status: 'AVAILABLE'
    };
}

exports.seed = async (knex, Promise) => {
    const mentors = [];
    for (let i = 22; i < 72; i++) {
        await mentors.push(await makeMentor(i));
    }

    for (let i = 322; i < 372; i++) {
        await mentors.push(await makeMentor(i));
    }
    console.log('----- MENTORS ADDED -----');
    return knex('mentorprofiles').insert(mentors);
};
