const Users = require('../database/helpers/users');

module.exports = (roles) => async (req, res, next) => {
    if(roles.includes('ALL')){
        return await next();
    } else {
        const user = await Users.getUserById(req.user.id);
        if(user === undefined){
            return await res.status(403).json({ error: 'Not authorized' });
        }
        const role = user.role;
        if(!roles.includes(role)){
            return await res.status(403).json({ error: 'Not authorized' });
        } else {
            return await next();
        }
    }
}