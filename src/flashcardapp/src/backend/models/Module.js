const mongoose = require('mongoose');
const ModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    main: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
}, { autoIndex: false });  // Disable automatic index creation

module.exports = { ModuleSchema };


