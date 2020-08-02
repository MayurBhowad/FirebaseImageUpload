const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Multer = require('multer');
const path = require('path')

const firebaseConfig = require('./config/firebaseConfig');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
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


// firebase.initializeApp(firebaseConfig);

// // var storage = firebase.storage();
// var storageRef = firebase.storage().ref();

// const uploadImage = (file) => {
//     // Points to the root reference

//     // Points to 'images'
//     var imagesRef = storageRef.child('images');

//     // Points to 'images/space.jpg'
//     // Note that you can use variables to create child values
//     var fileName = 'space.jpg';
//     var spaceRef = imagesRef.child(fileName);

//     // File path is 'images/space.jpg'
//     var path = spaceRef.fullPath

//     // File name is 'space.jpg'
//     var name = spaceRef.name

//     // Points to 'images'
//     var imagesRef = spaceRef.parent;
// }

app.listen(3000, () => { console.log('Server startd on 3000:') })