const { Gear } = require("../../models/projectModel");

async function updateGearDetails(req, res) {
	const { gearId } = req.params;

	const updatedGearDetails = {
		name: req.body.name,
		cost: req.body.cost,
		purchaseDate: req.body.purchaseDate,
		manufacturer: req.body.manufacturer,
		model: req.body.model,
		description: req.body.description,
		status: req.body.status,
	};
	try {
		// Update gear details data
		const updatedGear = await Gear.findByIdAndUpdate(gearId, updatedGearDetails, { new: true });
		if (!updatedGear) {
			return res.status(404, { message: "Gear not found" });
		}
		res.status(200, { message: "Gear Data has been updated" });
	} catch (err) {
		res.status(500, { message: "Error editing gear" });
		throw err;
	}
}

module.exports = { updateGearDetails };
