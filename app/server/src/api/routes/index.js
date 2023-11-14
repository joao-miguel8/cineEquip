const express = require("express");

// // initiate backend routes
const router = express.Router();

router.get("/test", (req, res) => {
	res.json({ test: "THIS IS A TEST ROUTE" });
});

module.exports = router;
