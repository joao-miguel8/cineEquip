const { Gear } = require("../../models/projectModel");
async function CreateGear(req, res) {
	const { name, status } = req.body;
	const createGear = await Gear.create({
		name: name,
		status: status,
	});
	return createGear;
}

module.exports = { CreateGear };
