module.exports = {
    uploadAvatar,
    getAvatar,
    uploadLogo,
    getLogo
}

require('dotenv').config();
const fs = require('fs');

async function uploadAvatar(req, res){
    try {
        const data = req.body;
        if(req.file && req.file.cloudStoragePublicUrl){
            data.imageUrl = req.file.cloudStoragePublicUrl;
        }
        return await res.status(200).json({ message: 'Avatar uploaded!', data });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getAvatar(req, res){
    try {
        // return await res.download(uploadFolder + filename);
        return await res.status(200).json({ message: 'Avatar fetched!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function uploadLogo(req, res){
    try {
        const data = req.body;
        if(req.file && req.file.cloudStoragePublicUrl){
            data.imageUrl = req.file.cloudStoragePublicUrl;
        }
        return await res.status(200).json({ message: 'Logo uploaded!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getLogo(req, res){
    try {
        return await res.status(200).json({ message: 'Logo fetched!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}