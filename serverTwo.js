const express = require('express');
const app = express();
const firebase = require('firebase');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/firebaseConfig');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

firebase.initializeApp(config);

// Error: firebase.storage is undefined, so not a function
var storageRef = firebase.storage().ref();

app.post('/upload',
    multer.single('file'),
    (req, res) => {
        console.log('Upload Image');
        const name = req.body.name;
        console.log(name);
        const file = req.file;
        console.log(file.originalname);
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

const uploadImageToStorage = (file) => {
    console.log('inside uploadImageTo storage...')
    var uploadTask = storageRef.child('images/octofez.png').put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        const url = snapshot.ref.getDownloadURL();
        console.log(url)
    }, function (error) {
        console.error("Something nasty happened", error);
    }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("Done. Enjoy.", downloadURL);
    });
}


app.listen(3000, () => {
    console.log('App listening to port 3000');
});