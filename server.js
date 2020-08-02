const express = require('express');
const app = express(); const express = require('express');
const app = express();
const firebase = require('firebase');
// const firebase = require('@firebase/app').default;
// require('@firebase/firestore');

const bodyparser = require('body-parser');
const Multer = require('multer');
const storage = require('@google-cloud/storage');



app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const storage = new Storage({
    projectId: "reactimgupload-be04a",
    keyFilename: "./config/reactimgupload-be04a-firebase-adminsdk-zmroq-a1176260a5.json"
});

const bucket = storage.bucket("reactimgupload-be04a.appspot.com");


const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

app.post('/upload',
    multer.single('file'),
    (req, res) => {
        console.log('Upload Image');
        const name = req.body.name;
        console.log(name);
        const file = req.file;
        console.log('File:', file);
        if (file) {
            console.log('sending to uploadImageToStorage...');
            uploadImage(file).then((success) => {
                res.status(200).send({
                    status: 'success'
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    });


var firebaseConfig = {
    apiKey: "AIzaSyB-sjiYtoOEXJrcZFQH3k4b1k1zxZgXN0Q",
    authDomain: "reactimgupload-be04a.firebaseapp.com",
    databaseURL: "https://reactimgupload-be04a.firebaseio.com",
    projectId: "reactimgupload-be04a",
    storageBucket: "reactimgupload-be04a.appspot.com",
    messagingSenderId: "808395749448",
    appId: "1:808395749448:web:35f9fea10aa43a590c407d",
    measurementId: "G-G6EDD8T9Q1"
};

firebase.initializeApp(firebaseConfig);


const uploadImage = (file) => {
    const storageRef = firebase.storage().ref();
    // const file = file.files[0];
    const name = new Date() + '-' + file.name;
    const metadata = {
        contentType: file.type
    }

    const task = storageRef.child(name).put(file, metadata);

    task
        .then(snapshot => snapshot.storageRef.getDownloadURL())
        .then(url => {
            console.log(url)
            alert("Image upload successfully");
            // const image = document.querySelector("#image");
            // image.src = url;
        })

}



app.listen(3000, () => { console.log('Server startd on 3000:') })