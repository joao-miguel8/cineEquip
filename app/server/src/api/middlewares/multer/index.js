const multer = require("multer");

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		// remove all white spaces
		const sanitizedFilePath = file.originalname.replace(/\s/g, "");
		cb(null, Date.now().toString() + sanitizedFilePath);
	},
});

// multer configuration for image uploads
const imageUpload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const mimeTypes = ["image/png", "image/jpg", "image/jpeg"];
		if (!file || !mimeTypes.includes(file.mimetype)) {
			return cb(new Error("Not a valid file"), false);
		}
		cb(null, true);
	},
});

module.exports = { imageUpload };
