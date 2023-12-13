const { Scene, Project } = require("../../models/projectModel");

async function deleteScene(req, res) {
	try {
		const id = req.params.sceneId;

		// Scene to delete in Scene Collection
		await Scene.findByIdAndDelete(id);
		// Delete scene ObjID reference In Project Document
		await Project.updateMany({ scenes: id }, { $pull: { scenes: id } });
		res.status(200, { message: "Successfully deleted scene" });
	} catch (err) {
		console.log(err);
		res.status(500, { message: "Internal server error" });
		throw err;
	}
}

module.exports = deleteScene;
