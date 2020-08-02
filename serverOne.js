var firebase = require('firebase');

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);


const uploadImage = (file) => {
    const ref = firebase.storage().ref();
    const file = file.files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log(url);
            const image = document.querySelector("#image");
            image.src = url;
        })
        .catch(console.error);
}

module.exports = uploadImage();