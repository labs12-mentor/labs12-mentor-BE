function makeMentor(i){
  return {
    user_id: i+1
  }
}

exports.seed = async (knex, Promise) => {
  const mentorsList = [];
  for(let i=0; i<10; i++){
    await mentorsList.push(makeMentor(i));
  }
  console.log("----- Mentors added! -----");
  return await knex('mentorprofiles').insert(mentorsList);
};