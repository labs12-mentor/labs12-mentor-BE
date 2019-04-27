function makeMentor(i){
  return {
    id: i,
    user_id: i
  }
}

exports.seed = function(knex, Promise) {
  return knex('mentorprofiles').del()
    .then(function () {
      const mentorsList = [];
      for(let i=0; i<5; i++){
        mentorsList.push(makeMentor(i));
        console.log(i);
      }
      console.log("----- Mentors added! -----");
      return knex('mentorprofiles').insert(mentorsList);
    });
};
