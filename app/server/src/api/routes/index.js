const express = require("express");
const { createNewProject } = require("../controllers/projects/CreateNewProjectController");
const { fetchAllProjects } = require("../controllers/projects/FetchAllProjectsController");
const { DeleteProject } = require("../controllers/projects/DeleteProjectController");
const { CreateNewScene } = require("../controllers/scenes/CreateNewSceneController");
const editChosenScene = require("../controllers/scenes/EditChosenSceneController");
const deleteScene = require("../controllers/scenes/DeleteSceneController");

// initiate backend routes
const router = express.Router();

router.get("/test", (req, res) => {
	res.send({ test: "This is a Test Route" });
});

// Project Routes
router.post("/createNewProject", createNewProject);
router.delete("/deleteProject/:projectId", DeleteProject);
router.get("/fetchAllProjects", fetchAllProjects);

// Scene Routes
router.post("/createScene/:projectId", CreateNewScene);
router.put("/editChosenScene/:sceneId", editChosenScene);
router.delete("/deleteScene/:sceneId", deleteScene);

module.exports = router;
