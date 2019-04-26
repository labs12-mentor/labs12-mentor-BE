require('dotenv').config();

function makeUserRole(){
  return {
    user_id: i,
    role_id: Math.round(Math.random()*3)
  }
}

exports.seed = function(knex, Promise) {
  return knex('user_roles').truncate()
    .then(function () {
      const userRolesList = [];
      for(let i=0; i<1000; i++){
        usersList.push(makeUserRole(i))
        console.log(i);
      }
      return knex('user_roles').insert(userRolesList);
    });
};
