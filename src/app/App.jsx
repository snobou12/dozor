/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
import { useConnect } from "../hooks/useConnect";

import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
	handleChangeActionData,
	handleChangePointData,
	handleChangeRoundTime,
	handleChangeTransitPoint,
	handleChangeTransitTime,
	handleChangeProcessingStatus,
	handleAddCode,
} from "../redux/reducers/game/gameSlice";
import {
	CodePage,
	EmptyPage,
	GameOverPage,
	HintPage,
	PointHintPage,
	StartPage,
	AuthPage,
} from "../pages";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { useRouting } from "../hooks/useRouting";

const App = () => {
	const dispatch = useDispatch();

	useConnect();

	const { device, fontSize } = useSelector(state => state.designSlice);

	useWindowSize(); // если нужно будет добавить рендер только для разных девайсов + fontSize

	const { actionData, pointData } = useSelector(state => state.gameSlice);
	//routing
	useRouting(actionData, pointData);

	// handle cookie set
	// React.useEffect(() => {
	// 	document.cookie =
	// 		"token=eyJhbGciOiJIUzI1NiJ9.eyJ0ZWFtSWQiOiIxMyIsImV4cCI6MTY1NzUyMjU3MSwidXNlcm5hbWUiOiJ0ZXN0In0.t7UCxaFGwsf1TPiE7hf_TMlyC7keF-BQTDsFIIwqDm4; max-age=99999";
	// }, []);

	//cookie parse
	// function getCookie(name) {
	// 	let value = "; " + document.cookie;
	// 	let parts = value.split("; " + name + "=");
	// 	if (parts.length == 2) return parts.pop().split(";").shift();
	// }
	//WS
	React.useEffect(() => {
		const socket = new SockJS("https://solbaumanec.ru/socket/dozor");
		const stompClient = Stomp.over(socket);
		stompClient.debug = null; // Отключить сообщения от stomp
		stompClient.connect({}, () => {
			stompClient.subscribe(`/action`, function (msg) {
				let json = JSON.parse(msg.body);
				let { responseType, object } = json;
				if (responseType === "DOZOR_STATUS") {
					console.log(`статус игры изменился на ${object}`);
					dispatch(
						handleChangeActionData({
							dozor_status: object,
							time: "",
						})
					);
				}
				if (responseType === "PRE_START_TIME") {
					dispatch(
						handleChangeActionData({
							dozor_status: "PRE_START_TIME",
							time: object,
						})
					);
				}
			});

			stompClient.subscribe(
				`/direct/${localStorage.getItem("dozor-token")}`,
				function (msg) {
					let json = JSON.parse(msg.body);
					console.log(json);

					const { responseType, object } = json;
					if (responseType === "POINT_DATA") {
						if (object.pointProcessingStatus === "ROUND") {
							dispatch(handleChangePointData(object));
						} else if (object.pointProcessingStatus === "TRANSIT") {
							dispatch(handleChangeProcessingStatus("TRANSIT"));
							dispatch(handleChangeTransitPoint(object));
						}
					}

					if (responseType === "ROUND_TIME") {
						dispatch(handleChangeRoundTime(object));
					}

					if (responseType === "TRANSIT_TIME") {
						dispatch(handleChangeTransitTime(object));
					}

					if (responseType === "LAST_POINT_FINISHED") {
						dispatch(
							handleChangeActionData({
								dozor_status: object,
								time: "",
							})
						);
					}
					if (responseType === "ENTERED_CODE") {
						dispatch(handleAddCode(object));
					}

					// console.log(json);
				}
			); // пример
		});
	}, []);

	//fontSize
	React.useEffect(() => {
		document.querySelector("html").style.fontSize = `${fontSize}px`;
	}, [fontSize]);
	return (
		<div className="app">
			<div className={`app__content app__content--${device}`}>
				<Routes>
					{/* Стартовая страница */}
					<Route path="/" element={<StartPage time={actionData.time} />} />

					{/* Страница ввода кода */}
					<Route
						path="/code"
						element={
							<CodePage
								enteredCodes={pointData.dozorPoint.enteredCodes || []}
								round={pointData?.dozorPoint?.title?.split(" ")[1]}
								time={pointData.roundTime}
								codes
							/>
						}
					/>

					{/* Страница подсказки на точке */}
					<Route
						path="/hint"
						element={
							<HintPage
								hint={pointData?.dozorPoint?.onPointHint?.text}
								time={pointData.roundTime}
							/>
						}
					/>

					{/* Страница подсказки на точкУ */}
					<Route
						path="/hint-point"
						element={
							<PointHintPage
								hint={pointData?.dozorPoint?.transitionHint?.text}
								time={pointData.transitTime}
							/>
						}
					/>
					{/* Конец игры страница */}
					<Route path="/game-over" element={<GameOverPage />} />
					{/* Страница авторизации */}

					<Route path="/auth" element={<AuthPage />} />

					{/* Пустая страница */}
					<Route path="/empty" element={<EmptyPage />} />
				</Routes>
				<ToastContainer />
			</div>
		</div>
	);
};

export default App;
