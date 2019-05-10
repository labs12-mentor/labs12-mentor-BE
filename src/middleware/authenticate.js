const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = async (req, res, next) => {
    const token = await req.get('Authorization');
    if (token){
        return await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err !== null && err !== undefined) return await res.status(401).json({ error: err });
            req.user = { id: decoded.subject };
            return await next();
        });
    }
    return await res.status(401).json({
        error: 'No token provided!'
    });
};
