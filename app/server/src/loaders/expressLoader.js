const cors = require("cors");
const routes = require("../api/routes/index");
const express = require("express");

function expressLoader(app) {
	app.use(cors());
	app.use(express.json());

	// --ROUTES INITIALIZATION--
	app.use(routes);
	app.use((err, req, res, next) => {
		console.error(err.stack);
	});
	app.use(express.static("uploads"));

	console.log("Express Running");
	return app;
}

module.exports = expressLoader;
