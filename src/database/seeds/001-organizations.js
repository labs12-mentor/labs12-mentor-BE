const faker = require('faker');

async function makeOrganization() {
    return {
        name: faker.company.companyName(),
        description: faker.company.catchPhrase(),
        logo: faker.image.business()
    };
}

exports.seed = async (knex, Promise) => {
    const organizations = [];
    await organizations.push({
        name: 'Administrators',
        description: 'The ultimate organization for admins',
        logo: faker.image.business()
    });

    for (let i = 0; i < 1; i++) {
        await organizations.push(await makeOrganization());
    }
    console.log('----- ORGANIZATIONS ADDED -----');
    return knex('organizations').insert(organizations);
};
