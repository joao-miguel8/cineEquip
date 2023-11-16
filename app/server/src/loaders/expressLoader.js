const cors = require("cors");
const routes = require("../api/routes/index");

function expressLoader(app) {
	app.use(cors());

	// --PASSPORT INITIALIZATION--
	// maintain persistent login sessions.

	// --ROUTES INITIALIZATION--
	app.use(routes);
	app.use((err, req, res, next) => {
		console.error(err.stack);
	});

	console.log("Express Running");
	return app;
}

module.exports = expressLoader;
