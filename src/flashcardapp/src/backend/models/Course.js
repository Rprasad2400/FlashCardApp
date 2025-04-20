const mongoose = require('mongoose');
const ModuleSchema = require('./Module');  // directly import the ModuleSchema

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
        type: [ModuleSchema],
        required: true,
    },
    image: {
        type: String
    }
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('courses', CourseSchema);


