const { Project } = require("../../models/projectModel");

async function DeleteProject(req, res) {
	try {
		const { projectId } = req.params;
		// if project id doesn't exist
		if (!projectId) {
			res.status(404).json({ message: "Project not found" });
			throw Error; // early Return if not found
		}
		// delete project if id exists
		await Project.findByIdAndDelete(projectId);
		// Success status/message
		res.status(200).json({ message: "Project successfully deleted" });
	} catch (err) {
		// Internal Server Error
		console.log(err);
		res.status(500).json({ message: "Error deleting Project" });
	}
}

module.exports = {
	DeleteProject,
};
