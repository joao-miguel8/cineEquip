// start initialization of Express application

const appLoader = require("./src/loaders/appLoader");

function serverStart() {
	appLoader();
}
module.exports = serverStart;
