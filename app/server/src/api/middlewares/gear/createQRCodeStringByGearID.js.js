const { generateQRCode } = require("./generateQRCode");

async function createQRCodeStringByGearID(gearData) {
	// Destructure the gear id from the newly made gear object
	const { _id } = gearData;
	// Convert the gearID to string format and generate QRCode URI
	const qrCodeUrl = await generateQRCode(_id.toString());
	return qrCodeUrl;
}

module.exports = { createQRCodeStringByGearID };
