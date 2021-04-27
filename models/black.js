const { model, Schema } = require("mongoose");

module.exports = model(
  "blacklisted",
  new Schema({
    user: String,
  })
);
