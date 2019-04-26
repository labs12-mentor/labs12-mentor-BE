function makeRoles(){
  return [
    {
      id: 0,
      name: 'User'
    },
    {
      id: 1,
      name: 'Mentee'
    },
    {
      id: 2,
      name: 'Mentor'
    },
    {
      id: 3,
      name: 'Administrator'
    }
  ];
}

exports.seed = function(knex, Promise) {
  return knex('roles').del()
    .then(function () {
      const roles = makeRoles();
      console.log("----- Roles added! -----");
      return knex('roles').insert(roles);
    });
};
