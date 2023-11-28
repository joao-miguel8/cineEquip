const express = require("express");
const { createNewProject } = require("../controllers/projects/CreateNewProjectController");
const { fetchAllProjects } = require("../controllers/projects/FetchAllProjectsController");
const { DeleteProject } = require("../controllers/projects/DeleteProjectController");
// // initiate backend routes
const router = express.Router();

router.get("/test", (req, res) => {
	res.send({ test: "This is a Test Route" });
});

// Create a new project
router.post("/createNewProject", createNewProject);
router.delete("/deleteProject/:projectId", DeleteProject);
router.get("/fetchAllProjects", fetchAllProjects);

module.exports = router;
