require("dotenv").config();

// MongoDB database library
const mongoose = require("mongoose");

async function DBLoader() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected to MongoDB`);
	} catch (error) {
		console.error(`Error Loading MongoDB ${error}`);
	}
}

module.exports = DBLoader;
