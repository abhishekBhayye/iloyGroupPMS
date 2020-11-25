const mongoose = require('mongoose');

const child = mongoose.Schema({
    name: String,
    listOfEmployee: [{firstName: String, lastName: String, dateOfBirth: String, speciality: String}]
})

const TreeSchema = mongoose.Schema({
    name: String,
    children: {
        type: [child],
        required: false
    },
    listOfEmployee: {
        type: [{firstName: String, lastName: String, dateOfBirth: String, speciality: String}],
        required: false
    }
})

module.exports = mongoose.model('Posts', TreeSchema);