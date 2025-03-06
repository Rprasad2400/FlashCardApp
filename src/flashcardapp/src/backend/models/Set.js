const mongoose = require('mongoose');

const { FlashCardSchema } = require('./FlashCard'); // Import only the Schema
const SetSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    accountId: {
        type: String,
        required: true,
    },

    flashcards: {
        type: [FlashCardSchema],
        required: true,
    }
    
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('set', SetSchema);
