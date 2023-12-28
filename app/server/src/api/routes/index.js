const express = require("express");
const { imageUpload } = require("../middlewares/multer");

// Routes:
const { createNewProject } = require("../controllers/projects/CreateNewProjectController");
const { fetchAllProjects } = require("../controllers/projects/FetchAllProjectsController");
const { DeleteProject } = require("../controllers/projects/DeleteProjectController");
const { CreateNewScene } = require("../controllers/scenes/CreateNewSceneController");
const editChosenScene = require("../controllers/scenes/EditChosenSceneController");
const deleteScene = require("../controllers/scenes/DeleteSceneController");
const { CreateGear } = require("../controllers/gear/CreateGearController");
const { fetchAllGear } = require("../controllers/gear/FetchAllGearController");
const deleteGear = require("../controllers/gear/DeleteGearController");
const { updateGearDetails } = require("../controllers/gear/UpdateGearDetailsController");

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

// Gear Routes
router.post("/createGear", imageUpload.single("img"), CreateGear);
router.delete("/deleteGear/:gearId", deleteGear);
router.get("/fetchAllGear", fetchAllGear);
router.put("/updateGearData/:gearId", updateGearDetails);

module.exports = router;
