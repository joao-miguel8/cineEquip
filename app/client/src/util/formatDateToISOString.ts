// This function is used to allow for reuse-ability of converting a Date object to a string in "YYYY-MM-DD" format using toISOString() using a split("T") and obtaining the first array index

// Format:
//  "YYYY-MM-DDTHH:mm:ss.sssZ" ---> "2023-01-01"

// Example:
//  "2023-01-01T12:30:00" ---> ["2023-01-01", "12:30:00"].

export function formatDateToISOString(date: Date) {
	return date ? date.toISOString().split("T")[0] : "";
}
