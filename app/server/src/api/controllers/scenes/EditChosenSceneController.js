const { Scene, Project } = require("../../models/projectModel");

async function editChosenScene(req, res) {
	const sceneId = req.params.sceneId;
	const updateData = {
		name: req.body.name,
		description: req.body.description,
		kitList: req.body.kitList,
		callTime: req.body.callTime,
		callSheet: req.body.callSheet,
		weatherConditions: req.body.weatherConditions,
		calenderStartDate: req.body.calenderStartDate,
		calenderEndDate: req.body.calenderEndDate,
	};
	const chosenScene = await Scene.findByIdAndUpdate(sceneId, updateData, { new: true });
	console.log(chosenScene);
	// console.log(req.body);
	return chosenScene;
}

module.exports = editChosenScene;
