var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    roleId: String,
	roleName: String
});

var Role = mongoose.model("Role",roleSchema);

module.exports = Role;