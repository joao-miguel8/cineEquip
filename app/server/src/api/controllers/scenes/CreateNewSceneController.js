const { Project, Scene } = require("../../models/projectModel");

async function CreateNewScene(req, res) {
	try {
		// project ID from params
		const projID = req.params.projectId;
		// find project with id
		const chosenProj = await Project.findById(projID);
		// Create new Scene
		const newScene = new Scene({
			name: req.body.name,
		});
		// Save new Scene to DB Scene Collection
		await newScene.save();
		// push scene to scenes array in chosen project
		chosenProj.scenes.push(newScene);
		// Re-save Project to DB Project Collection
		await chosenProj.save();
		return newScene;
	} catch (err) {
		console.log(err);
		throw err;
	}
}

module.exports = {
	CreateNewScene,
};
