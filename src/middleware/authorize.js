const Users = require('../database/helpers/users');

module.exports = (roles) => async (req, res, next) => {
    if(roles.includes('ALL')){
        return next();
    } else {
        const { role } = await Users.getUserById(req.user.id);
        if(!roles.includes(role)){
            return res.status(403).json({ error: 'Not authorized' });
        } else {
            return next();
        }
    }
}