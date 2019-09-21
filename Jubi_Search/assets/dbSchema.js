var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var User = new Schema({
  name: String,
  email: String,
  contact: String
});

User.index({ name: 1 });
User.index({ email: 1 });
User.index({ contact: 1 });

module.exports = mongoose.model("User", User);
