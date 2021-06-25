const express = require('express');
const app = express();

const Multer = require('multer');
const uploadImageToStorage = require('./middlewares/uploadImageToStorage');

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