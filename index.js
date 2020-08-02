const express = require('express');
const app = express();
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');
// const firebase = require('firebase');
const bodyparser = require('body-parser');
const cors = require('cors');


// const quickStart = require('./custom/quickStart');
// const firebaseConfig = require('./config/firebaseConfig');

const storage = new Storage({
    projectId: "reactimgupload-be04a",
    keyFilename: "./config/reactimgupload-be04a-firebase-adminsdk-zmroq-a1176260a5.json"
});

// const storage = quickStart.storage;
// const bucket = quickStart.bucket;
const bucket = storage.bucket("reactimgupload-be04a.appspot.com");

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

app.listen(3000, () => {
    console.log('App listening to port 3000');
});

/**
* Adding new file to the storage
*/
app.post('/upload',
    multer.single('file'),
    (req, res) => {
        console.log('Upload Image');
        const name = req.body.name;
        console.log(name);
        const file = req.file;
        console.log(file);
        if (file) {
            console.log('sending to uploadImageToStorage...');
            uploadImageToStorage(file).then((success) => {
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
const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}`;
        // console.log('newFileName: ', newFileName);

        let fileUpload = bucket.file(newFileName);
        // console.log('fileUpload: ', fileUpload);

        const blobStream = fileUpload.createWriteStream({

            metadata: {
                contentType: file.mimetype
            }
        });



        blobStream.on('error', (error) => {
            console.log(error);
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = (`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
            resolve(url);

            console.log(url);
        });

        blobStream.end(file.buffer);
    });
}


// firebase.initializeApp(firebaseConfig);

// const uploadImageToStorage = (file) => {
//     console.log('inside uploaImageto Storage');
//     const ref = firebase.storage();
//     // const file = document.querySelector("#photo").files[0];
//     const name = new Date() + '-' + file.name;
//     console.log(name);
//     const metadata = {
//         contentType: file.type
//     }
//     const task = ref.child(name).put(file, metadata);

//     task
//         .then(snapshot => snapshot.ref.getDownloadURL())
//         .then(url => {
//             console.log(url)
//             alert("Image upload successfully");
//             // const image = document.querySelector("#image");
//             // image.src = url;
//         })
// }