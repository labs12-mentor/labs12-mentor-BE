module.exports = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
};