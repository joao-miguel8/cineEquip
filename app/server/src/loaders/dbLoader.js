const devConfig = require("../../config/dev");

// MongoDB database library
const mongoose = require("mongoose");
console.log(process.env.DB_URI);

async function DBLoader() {
	try {
		await mongoose.connect(devConfig.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log(`Connected to MongoDB`);
	} catch (error) {
		console.error(`Error Loading MongoDB ${error}`);
	}
}

module.exports = DBLoader;
