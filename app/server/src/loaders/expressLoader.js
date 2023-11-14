const express = require("express");
const cors = require("cors");
const bodyParser = require("express").json;
const routes = require("../api/routes/index");

function expressLoader(app) {
	app.use(cors());
	// Middleware parses requests to JSOn
	app.use(bodyParser());

	// Routes
	app.use("/api", routes);

	console.log("Express Running");
	return app;
}

module.exports = expressLoader;
