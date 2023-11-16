const express = require("express");
const DBLoader = require("./dbLoader");
const expressLoader = require("./expressLoader");
const serverLoader = require("./serverLoader");

async function appLoader() {
	try {
		const app = express();
		// Loaders
		await DBLoader();
		expressLoader(app);
		serverLoader(app);
	} catch (error) {
		console.error(`Error loading AppLoader ${error}`);
	}
}

module.exports = appLoader;
