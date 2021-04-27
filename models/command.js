const mongoose = require('mongoose');
module.exports = mongoose.model('commands', new mongoose.Schema({
Guild: String,
Cmds: Array
}));
