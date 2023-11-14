// start initialization of Express application

const serverStart = app => {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, error => {
		if (error) {
			console.error("Error Starting Server", error);
		}
		console.log(`server Started on ${PORT}`);
	});
};

module.exports = serverStart;
