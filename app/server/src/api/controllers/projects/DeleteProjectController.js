const { Scene, Project } = require("../../models/projectModel");

async function DeleteProject(req, res) {
	const { projectId } = req.params;

	try {
		// if project id doesn't exist
		if (!projectId) {
			res.status(404).json({ message: "Project not found" });
			throw Error; // early Return if not found
		}
		// delete project if id exists
		const project = await Project.findByIdAndDelete(projectId);
		// delete scene from scenes collection
		const deleteScenes = project.scenes;
		await Scene.deleteMany({ _id: { $in: deleteScenes } });
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
