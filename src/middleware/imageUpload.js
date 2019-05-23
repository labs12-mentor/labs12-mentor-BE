'use strict';

const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
require('dotenv').config();

const gcs = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: '/path/to/keyfile.json'
});
  
const bucketName = process.env.GCS_BUCKET_NAME
const bucket = gcs.bucket(bucketName);
  
function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}
  
let imageUpload = {};
  
imageUpload.uploadToGCS = (req, res, next) => {
    if(!req.file) return next();
  
    const gcsname = req.file.originalname;
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });
  
    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });
  
    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });
  
    stream.end(req.file.buffer);
}

module.exports = imageUpload;