const { Schema, model } = require('mongoose');

const schema = new Schema({

    Guild: String,
    Channel: String,
    Activated: Boolean 

})

module.exports = model('global-chat', schema)