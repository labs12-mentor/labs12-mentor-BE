module.exports = {
    validateUser,
    validateCredentials,
    validateOrganization
}

async function validateUser(userData){
    if(
        !userData.email
        || !userData.password
    ) return false;

    return true;
}

async function validateCredentials(userData){
    if(!userData.email || !userData.password) return false;

    return true;
}

async function validateOrganization(organizationData){
    if(!organizationData.name) return false;

    return true;
}