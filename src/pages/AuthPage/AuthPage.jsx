
import React from "react";
import { useNavigate } from "react-router-dom";
import { ClientService } from "../../services/client.service";
import "./AuthPage.scss";
const AuthPage = () => {
	const navigate = useNavigate();
	const [login, setLogin] = React.useState("");
	const [password, setPassword] = React.useState("");
	const handleSubmit = async () => {
		try {
			let response = await ClientService.auth(login, password);
			if (response.data.body.token) {
				let token = response.data.body.token;
				localStorage.setItem("dozor-token", token);
				navigate("/");
			}
		} catch (e) {
			console.log(e.response.data.text);
		}
	};
	return (
		<div className="page_auth page">
			<div className="page__title">Авторизация</div>
			<div className="page_content content__auth">
				<input
					type="text"
					placeholder="login"
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button className="custom_btn" onClick={handleSubmit}>
					submit
				</button>
			</div>

			<div className="page__empty"></div>
		</div>
	);
};

export default AuthPage;
