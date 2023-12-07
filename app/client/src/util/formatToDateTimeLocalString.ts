// Description:
/*
- converts a date value into a string format to be used in HTML datetime-local input elements to view the date in the input.
- The function takes a date value as input, then uses the appropriate format toISOString(), slice method removes seconds and milliseconds, to format for the expected datetime-local input.
*/
// Example ->  input: YYYY-MM-DDTHH:mm:ss   Output:YYYY-MM-DDTHH:mm

export const formatToDateTimeLocalString = (dateVal: Date | string) => {
	const date = new Date(dateVal);
	return date.toISOString().slice(0, 16); //  slice/remove seconds and milliseconds
};
