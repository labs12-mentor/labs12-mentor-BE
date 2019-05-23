module.exports = {
    uploadAvatar,
    getAvatar,
    uploadLogo
}

require('dotenv').config();
const fs = require('fs');

async function uploadAvatar(req, res){
    try {
        console.log(req.file);
        return await res.status(200).json({ message: 'Avatar uploaded!', file_id: req.file.filename });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function getAvatar(req, res){
    try {
        const filename = req.params.id;
        const uploadFolder = 'uploads/';
        return await fs.readFile(uploadFolder+filename, 'utf8', async (err, data) => {
            if(err) console.log(err);
            console.log(data);
            return await res.json(data);
        });
        // return await res.download(uploadFolder + filename);
        // return await res.status(200).json({ message: 'Avatar downloaded!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}

async function uploadLogo(req, res){
    try {
        console.log(req.file);
        return await res.status(200).json({ message: 'Logo uploaded!' });
    } catch (error) {
        return await res.status(500).json({ error: error.message });
    }
}