const QRcode = require("qrcode");

async function generateQRCode(QRCodeString) {
	try {
		const url = await QRcode.toDataURL(QRCodeString);
		return url;
	} catch (err) {
		console.log(err);
	}
}

module.exports = { generateQRCode };
