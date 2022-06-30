/** @format */

import axios from "axios";
const API_URL = "https://solbaumanec.ru/dozor";

const instance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": true,
	},
});
export const ClientService = {
	async connect() {
		return instance.get("/connect");
	},
	async postCode(code) {
		return instance.post("/code/save", { code: code });
	},
};
