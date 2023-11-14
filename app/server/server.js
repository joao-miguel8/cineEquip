// start initialization of Express application

// const serverInit = require("./server");

const appLoader = require("./src/loaders/appLoader");

function serverStart() {
	appLoader();
}
module.exports = serverStart;
