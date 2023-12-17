const { Gear } = require("../../models/projectModel");

async function fetchAllGear(req, res) {
	try {
		const gearCollection = await Gear.find();
		return res.status(200).json(gearCollection);
	} catch (err) {
		console.log("Error Fetching projects:", err);
		res.status(500).json({ message: "Internal Server error" });
	}
}

module.exports = { fetchAllGear };
