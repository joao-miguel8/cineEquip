const { Gear } = require("../../models/projectModel");
const { createQRCodeInGearCreation } = require("../../middlewares/gear/createQRCodeInGearCreation");

async function CreateGear(req, res) {
	try {
		const { name, status } = req.body;
		const createGear = await Gear.create({
			name: name,
			status: status,
		});

		const gearWithQRCode = await createQRCodeInGearCreation(createGear);

		return res.status(200).json({ createGear, gearWithQRCode });
	} catch (err) {
		res.status(500).json({ message: "Error Creating Gear" });
		throw err;
	}
}

module.exports = { CreateGear };
