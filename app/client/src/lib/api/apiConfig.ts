import axios from "axios";
import { BASE_URL } from "./BASE_URL";

// This represents an Axios instance, encapsulating the config for making HTTP requests to a specific API base URL. Using, developers interact can easily interact with the API, this pre-configured instance allows default headers set for JSON content. This abstract and simplifies the process of making API requests, promoting consistency and maintainability.

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"content-type": "application/json",
	},
});
