const { Project } = require("../../models/projectModel");

async function fetchAllProjects(req, res) {
	try {
		// populate method: replaces the document id reference with the actual document data so when we call this function it will populate those arrays with document data
		const projCollection = await Project.find().populate("scenes");
		res.status(200).json(projCollection);
	} catch (err) {
		console.log("Error Fetching projects:", err);
		res.status(500).json({ message: "Internal Server error" });
	}
}

module.exports = {
	fetchAllProjects,
};
