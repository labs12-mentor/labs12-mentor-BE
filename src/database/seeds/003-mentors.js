async function makeMentor(i){
  return {
    user_id: i
  }
}

exports.seed = async (knex, Promise) => {
  const mentors = [];
  for(let i=22; i<32; i++){
    await mentors.push(await makeMentor(i));
  }
  console.log('----- MENTORS ADDED -----');
  return knex('mentorprofiles').insert(mentors);
};