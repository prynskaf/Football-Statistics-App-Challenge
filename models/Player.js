const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    overallRating: {
        type: Number,
        required: true
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
