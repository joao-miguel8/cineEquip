const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GearSchema = new Schema({
	QRCode: String,
	serialNumber: String,
	name: String,
	img: String,
	status: { type: String, enum: ["isAvailable", "isInUse", "isDamaged"], default: "isAvailable" },
	manufacturer: { type: String, require: false },
	model: { type: String, require: false },
	description: { type: String, require: false },
	cost: { type: Number, require: false },
	purchaseDate: { type: Date, require: false },
	filters: { type: [String], require: false },
});

const KitSchema = new Schema({
	name: String,
	description: { type: String, require: false },
	gearList: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Gear",
			},
		],
		default: [],
		require: false,
	},
	filter: { type: [String], require: false },
	checkOutDate: { type: Date, require: false },
	checkInDate: { type: Date, require: false },
});

const SceneSchema = new Schema({
	name: String,
	description: String,
	kitList: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Kit",
			},
		],
		default: [],
		require: false,
	},
	callTime: { type: Date, require: false },
	callSheet: { type: String, require: false },
	weatherConditions: { type: String, require: false },
	calenderStartDate: { type: Date, require: false },
	calenderEndDate: { type: Date, require: false },
});

const ProjectSchema = new Schema({
	title: { type: String },
	gear: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Gear",
			},
		],
		default: [],
		require: false,
	},
	scenes: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Scene",
			},
		],
		default: [],
		require: false,
	},
	kit: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Kit",
			},
		],
		default: [],
		require: false,
	},
});

// Schema Model Exports
module.exports = {
	Gear: mongoose.model("Gear", GearSchema),
	Kit: mongoose.model("Kit", KitSchema),
	Scene: mongoose.model("Scene", SceneSchema),
	Project: mongoose.model("Project", ProjectSchema),
};
