const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String, // username as _id, so it's a string
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('users', UserSchema);