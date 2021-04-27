const mongoose = require('mongoose');
module.exports = mongoose.model('ticketlogs', new mongoose.Schema({
guildId: { 
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    afk: {
        type: String,
        required: true,
        default: "AFK"
    },
    timestamp: {
        type: Number,
        required: true,
        
    },
    username: { //So we can change username back
        type: String,
        required: true,
    }
}));
