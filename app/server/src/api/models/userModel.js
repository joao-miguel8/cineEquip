const mongoose = require("mongoose");
const Schema = mongoose.mongo.model;

const UserSchema = new Schema({
	google: {
		id: {
			type: String,
		},
		name: String,
	},
	email: {
		type: String,
	},
});

module.exports = UserSchema.model("User", UserSchema);
