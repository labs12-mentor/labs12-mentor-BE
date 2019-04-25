module.exports = {
    validateUser
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