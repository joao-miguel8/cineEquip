const { createQRCodeStringByGearID } = require("./createQRCodeStringByGearID.js");

async function createQRCodeInGearCreation(createdGearData) {
	try {
		// Get the id from the newly created gear object
		const qrCodeUrl = await createQRCodeStringByGearID(createdGearData);
		// Update the QRCode field in gear DB Model
		createdGearData.QRCode = qrCodeUrl;
		// Save QRCode to the newly created gear document in the gears collection
		await createdGearData.save();
		return createdGearData;
	} catch (err) {
		throw err;
	}
}

module.exports = { createQRCodeInGearCreation };
