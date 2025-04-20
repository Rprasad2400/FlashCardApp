const mongoose = require('mongoose');
const { Module } = require('./Module'); // Import only the Schema
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    modules: {
        type: [Module],
        required: true,
    },
    image: {
        type: String
    }
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('courses', CourseSchema);


