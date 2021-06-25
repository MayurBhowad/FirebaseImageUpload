const express = require('express');
const app = express();
const Multer = require('multer');
// const { Storage } = require('@google-cloud/storage');
// const { format } = require('util');
const uploadImageToStorage = require('./middlewares/uploadImageToStorage');

// const storage = new Storage({
//     projectId: "reactimgupload-be04a",
//     keyFilename: "./config/reactimgupload-be04a-firebase-adminsdk-zmroq-d13bc2fcc3.json"
// });

// const bucket = storage.bucket("reactimgupload-be04a.appspot.com");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

app.listen(3000, () => {
    console.log('App listening to port 3000');
});

/**
 * Adding new file to the storage
 */
app.post('/upload', multer.single("file"), (req, res) => {
    console.log('Upload Image');

    let file = req.file;

    if (file) {
        uploadImageToStorage(file).then((success) => {
            console.log(success)
            res.status(200).send({
                status: 'success'
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
// const uploadImageToStorage = (file) => {
//     return new Promise((resolve, reject) => {
//         if (!file) {
//             reject('No image file');
//         }

//         let newFileName = `new/${file.originalname}`;
//         let storageFileName = `${file.originalname}`
//         console.log(`https://firebasestorage.googleapis.com/v0/b/reactimgupload-be04a.appspot.com/o/new%2F${storageFileName}?alt=media&token=2c6cc6a9-2ce4-4b9c-981a-ed9f7c68e9aa`)
//         let fileUpload = bucket.file(newFileName);
//         const blobStream = fileUpload.createWriteStream({
//             metadata: {
//                 // destination: `/folder/${filename}`,
//                 contentType: file.mimetype
//             }
//         });
//         // https://firebasestorage.googleapis.com/v0/b/reactimgupload-be04a.appspot.com/o/Bird%2F20160325124944_1592570804713?alt=media&token=139e1dad-869b-40fc-9fdb-ba04b3e117e9
//         // https://firebasestorage.googleapis.com/v0/b/reactimgupload-be04a.appspot.com/o/20160811182412.jpg?alt=media&token=ddbc9303-6001-49e8-bbcb-c3496c670ae0
//         blobStream.on('error', (error) => {
//             reject('Something is wrong! Unable to upload at the moment.');
//         });

//         blobStream.on('finish', () => {
//             // The public URL can be used to directly access the file via HTTP.
//             const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
//             resolve(url);
//         });

//         blobStream.end(file.buffer);
//     });
// }