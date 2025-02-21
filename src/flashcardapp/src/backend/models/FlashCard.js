const mongoose = require('mongoose');

const FlashCardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('flashcards', FlashCardSchema);
