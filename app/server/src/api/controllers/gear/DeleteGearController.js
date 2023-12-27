const fs = require("fs");
const { Gear } = require("../../models/projectModel");

async function deleteGear(req, res) {
	try {
		const { gearId } = req.params;

		const gear = await Gear.findByIdAndDelete(gearId);
		// Delete img file in uploads folder
		const uploadDir = `./uploads/${gear.img}`;
		fs.unlinkSync(uploadDir);

		// No gear found with given gearId
		if (!gearId) {
			return res.status(404).json({ message: "Chosen Gear not found" });
		}

		// Send success response if deleted
		return res.status(200).json({ message: "Gear deleted successfully" });
	} catch (err) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

module.exports = deleteGear;
