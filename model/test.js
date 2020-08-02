const mongoose = require('mongoose');

const testShema = mongoose.Schema({
    name: {
        type: String
    },
    file: {
        type: String
    }
})

module.exports = mongoose.model('test', testShema);