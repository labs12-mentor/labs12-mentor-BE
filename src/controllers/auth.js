module.exports = {
    loginUser,
    registerUser
}

async function loginUser(req, res){
    res.status(200).json({ message: 'login user API OK' });
}

async function registerUser(req, res){
    res.status(200).json({ message: 'register user API OK' });
}