const { Project } = require("../../models/projectModel");

async function CreateNewScene(req, res) {
	try {
		console.log(req.body);
	} catch (err) {
		console.log(err);
		throw err;
	}
}

module.exports = {
	CreateNewScene,
};
