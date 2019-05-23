module.exports = {
    uploadAvatar,
    uploadLogo
}

require('dotenv').config();

async function uploadAvatar(req, res){
    try {
        const data = req.body;
        if(req.file && req.file.cloudStoragePublicUrl){
            data.imageUrl = req.file.cloudStoragePublicUrl;
        }
        return await res.status(200).json({ message: 'Avatar uploaded!', ...data });
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
        return await res.status(200).json({ message: 'Logo uploaded!', ...data });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}