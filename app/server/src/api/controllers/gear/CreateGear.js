const { Gear } = require("../../models/projectModel");
const { createQRCodeInGearCreation } = require("../../middlewares/gear/createQRCodeInGearCreation");

async function CreateGear(req, res) {
	const { name, status } = req.body;
	const createGear = await Gear.create({
		name: name,
		status: status,
	});

	const gearWithQRCode = await createQRCodeInGearCreation(createGear);
	console.log(createGear, gearWithQRCode);

	return { createGear, gearWithQRCode };
}

module.exports = { CreateGear };
