const mongoose = require('mongoose');
module.exports = mongoose.model('warns', new mongoose.Schema({
guildid: String,
user: String,
content: Array
}));
