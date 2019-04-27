function makeRoles(){
  return [
    {
      id: 0,
      name: 'Mentee'
    },
    {
      id: 1,
      name: 'Mentor'
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
