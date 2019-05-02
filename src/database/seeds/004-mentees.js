async function makeMentee(i){
  return {
    user_id: i,
    wanted_mentor_id: i%10+1
  }
}

exports.seed = async (knex, Promise) => {
  const mentees = [];
  for(let i=32; i<120; i++){
    await mentees.push(await makeMentee(i));
  }
  console.log('----- MENTEES ADDED -----');
  return knex('menteeprofiles').insert(mentees);
};