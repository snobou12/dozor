import $api from "../api/index"; 
export const ClientService = {
	async auth(login,password){
		return $api.get(`/auth/login?password=${password}&username=${login}`)
	},
	async connect() {
		return $api.get("/dozor/connect");
	},
	async postCode(code) {
		return $api.post(`/dozor/code/save?code=${code}`);
	},
};
