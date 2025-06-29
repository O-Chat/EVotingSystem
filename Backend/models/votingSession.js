const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: String,
    votes: {
        type: Number,
        default: 0
    }
});

const votingSessionSchema = new mongoose.Schema({
    //Title of the Voting
    title: { type: String, required: true },

    description: String,
    //List of candidates
    candidates: [candidateSchema],
    //Created by from User Schema
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //keep track of voters who have voted
    voters:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    isActive: { type: Boolean, default: true },

    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('VotingSession', votingSessionSchema);