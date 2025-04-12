const mongoose = require('mongoose');


const RankingSchema = new mongoose.Schema({
    //set the userId as a string to match the user model
    _id : {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    }
}, { autoIndex: false });  // Disable automatic index creation



// unqiue id is setID
const LeaderBoardSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
    },
    rankings: {
        type: [RankingSchema],
        required: true,
    },
}, { autoIndex: false });  // Disable automatic index creation


module.exports = mongoose.model('leaderboards', LeaderBoardSchema);


