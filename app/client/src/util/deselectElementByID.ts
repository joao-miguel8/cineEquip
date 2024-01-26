export const deselectElementByID = (arr: any[], elementID: string | null) => {
	if (elementID !== null) {
		return arr.filter(element => element._id !== elementID);
	}
};
