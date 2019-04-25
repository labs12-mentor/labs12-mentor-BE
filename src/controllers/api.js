module.exports = {
    rootRoute
}

async function rootRoute(req, res){
    res.status(200).json({ message: 'API OK' });
}