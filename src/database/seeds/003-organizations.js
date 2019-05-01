const faker = require('faker');

function makeOrganization(i){
  return {
    name: faker.company.companyName(),
    logo: faker.image.business(),
    admin_id: i+1
  }
}

exports.seed = async (knex, Promise) => {
  const organizationsList = [];
  for(let i=0; i<1; i++){
    await organizationsList.push(makeOrganization(i));
  }

  console.log("----- Organizations added! -----");
  return await knex('organizations').insert(organizationsList);
};
