export const selectElementByID = (arr: any[], elementID: string | null) => {
	if (elementID !== null) {
		return arr.find(element => element._id === elementID);
	}
};
