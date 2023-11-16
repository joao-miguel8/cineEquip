/** @type {import('tailwindcss').Config} */

const fontSizes = {};
const minFontSize = 12;
const maxFontSize = 70;
const base = 16;
let i = minFontSize;
while (i <= maxFontSize) {
	fontSizes[i] = `${i / base}rem`;
	i += 2;
}

// 200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700

module.exports = {
	content: ["./src/**/*.{html,js,ts,tsx}"],
	theme: {
		fontSize: fontSizes,
		fontFamily: {
			karla: ["Karla", "sans-serif"],
		},

		extend: {
			colors: {
				primary: "#D9E1F0",
				textDark: "#28395F",
			},
		},
	},
};
