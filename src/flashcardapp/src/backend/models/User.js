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
    courses: {
        type: [String], // array of course names
        required: true,
    },
    sets: {
        type: [String], // array of set names
        required: true,
    },
    tasksCompleted: [
        {
            task_id: { type: String }, // Changed from ObjectId to String
            set_id: { type: String },   // Changed from ObjectId to String
            progress: {type: String},
            goal: {type: String},
            due_date: {type: String},
            name:{type: String},
            course_id:{type: String},
        }
    ],
    badges: {
        type: [String],
        default: [0, 0, 0, 0]
    },
    date_joined: {
        type: String,
        default: () => new Date().toISOString()
    },
    total_pnts: {
        type: Number,
        default: 0
    },
    recent_sets: {
        type: [String],
        default: [0,0,0,0,0]
    }
}, { autoIndex: false });  // Disable automatic index creation

module.exports = mongoose.model('users', UserSchema);