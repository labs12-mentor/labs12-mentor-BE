const faker = require('faker');

function makeOrganization(i){
  return {
    id: i,
    name: faker.company.companyName(),
    admin_id: i
  }
}

exports.seed = function(knex, Promise) {
  return knex('organizations').del()
    .then(function () {
      const organizationsList = [];
      for(let i=0; i<1; i++){
        organizationsList.push(makeOrganization(i));
        console.log(i);
      }
      console.log("----- Organizations added! -----");
      return knex('organizations').insert(organizationsList);
    });
};
