const express = require("express");

// // initiate backend routes
const router = express.Router();

router.get("/test", (req, res) => {
	res.send({ test: "TEST TEST TEST TEST" });
});

router.get("/test2", (req, res) => {
	res.send([{ test: "TEST TEST TEST TEST" }, { test: "TEST TEST TEST TEST" }, { test: "TEST TEST TEST TEST" }, { test: "TEST TEST TEST TEST" }]);
});

module.exports = router;
