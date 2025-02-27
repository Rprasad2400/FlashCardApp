const mongoose = require('mongoose');
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
        type: Array,
        required: true,
    },
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('courses', CourseSchema);


