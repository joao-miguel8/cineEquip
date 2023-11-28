const { Project } = require("../../models/projectModel");

async function createNewProject(req, res) {
	try {
		const createProject = await Project.create({
			title: req.body.title,
		});
		console.log(req.body.title);
		res.status(200).json(createProject);
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: "Invalid input title is required",
		});
	}
}

module.exports = {
	createNewProject,
};
