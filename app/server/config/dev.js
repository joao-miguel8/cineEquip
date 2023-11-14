// Store our development configuration
require("dotenv").config();

const devConfig = {
	DB_URI: process.env.MONGO_URI,
};

module.exports = devConfig;
