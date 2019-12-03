var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
    userName: String,
    emailId: {type: String, unique: true},
    password: String,
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true
      }
});

userSchema.plugin(uniqueValidator);
var User = mongoose.model("User",userSchema);

module.exports = User;