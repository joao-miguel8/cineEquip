const { Project } = require("../../models/projectModel");

async function fetchAllProjects(req, res) {
	try {
		const projCollection = await Project.find();
		res.status(200).json(projCollection);
	} catch (err) {
		console.log("Error Fetching projects:", err);
		res.status(500).json({ message: "Internal Server error" });
	}
}

module.exports = {
	fetchAllProjects,
};
