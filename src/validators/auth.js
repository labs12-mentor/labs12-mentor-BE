module.exports = {
    validateUser,
    validateCredentials,
    validateOwner,
    validateAdministrator
}

async function validateUser(userData){
    if(
        !userData.username
        || !userData.password
        || !userData.first_name
        || !userData.last_name
        || !userData.email
    ) return false;

    return true;
}

async function validateCredentials(userData){
    if(!userData.username || !userData.password) return false;

    return true;
}

async function validateOwner(userData){
    if(
        !userData.username
        || !userData.password
        || !userData.email
    ) return false;
    
    return true;
}

async function validateAdministrator(userData){
    if(
        !userData.username
        || !userData.password
        || !userData.first_name
        || !userData.last_name
        || !userData.email
        || !userData.company_name
    ) return false;
    
    return true;
}