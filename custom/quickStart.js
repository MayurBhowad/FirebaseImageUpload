'use strict';

async function quickstart(
    projectId = 'reactimgupload-be04a', // Your Google Cloud Platform project ID
    keyFilename = '../config/reactimgupload-be04a-firebase-adminsdk-zmroq-a1176260a5.json' //Full path of the JSON file
) {
    // Imports the Google Cloud client library
    const { Storage } = require('@google-cloud/storage');

    // Creates a client
    const storage = new Storage({ keyFilename, projectId });
    const bucket = storage.bucket('reactimgupload-be04a.appspot.com')
}

module.exports = quickstart();