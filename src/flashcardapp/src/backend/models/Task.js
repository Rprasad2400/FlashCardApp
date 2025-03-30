const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    task_id: {
        type: String,
        required: true,
    }, 
    set_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    due_date: {
        type: String,
        required: true,
    }
    
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('task', TaskSchema, "Tasks"); // Specify collection name as "Tasks"
