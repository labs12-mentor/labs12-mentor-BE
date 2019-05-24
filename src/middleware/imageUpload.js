'use strict';

require('dotenv').config();
const uuidv4 = require('uuid/v4');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    fileSize: 5*1024*1024
});

const gcs = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: 'keyfile.json'
});

const bucketName = process.env.GCS_BUCKET_NAME
const bucket = gcs.bucket(bucketName);
  
async function getPublicUrl(filename) {
    return await `https://storage.googleapis.com/${bucketName}/${filename}`;
}
  
async function uploadToGCS(req, res, next){
    if(!req.file) return next();
    
    const gcsname = uuidv4();
    const file = bucket.file(gcsname);
  
    const stream = await file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        },
        resumable: false
    });
  
    await stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });
  
    await stream.on('finish', async () => {
        req.file.cloudStorageObject = gcsname;
        await file.makePublic().then(async () => {
            req.file.cloudStoragePublicUrl = await getPublicUrl(gcsname);
            next();
        });
    });
  
    await stream.end(req.file.buffer);
}

module.exports = {
    uploadToGCS,
    getPublicUrl,
    upload
};