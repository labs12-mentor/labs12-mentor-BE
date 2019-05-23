module.exports = {
    uploadAvatar,
    uploadLogo
}

require('dotenv').config();


async function uploadAvatar(req, res){
    try {
        return await res.status(200).json({ message: 'Avatar uploaded!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function uploadLogo(req, res){
    try {
        return await res.status(200).json({ message: 'Logo uploaded!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}