async function makeMentee(i) {
    return {
        user_id: i,
        wanted_mentor_id: (i % 50) + 1,
        status: 'AVAILABLE'
    };
}

exports.seed = async (knex, Promise) => {
    const mentees = [];
    for (let i = 72; i < 222; i++) {
        await mentees.push(await makeMentee(i));
    }
    console.log('----- MENTEES ADDED -----');
    return knex('menteeprofiles').insert(mentees);
};
