/** @format */

import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
} from "../redux/reducers/game/gameSlice";
import {
	CodePage,
	EmptyPage,
	GameOverPage,
	HintPage,
	PointHintPage,
	StartPage,
} from "../pages";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";

const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	// const { isLoading, data, error } = useConnect();
	// React.useEffect(() => {
	// 	console.log(data);
	// }, [isLoading]);
	const { device, fontSize } = useSelector(state => state.designSlice);
	useWindowSize(); // если нужно будет добавить рендер только для разных девайсов + fontSize
	const { actionData, pointData } = useSelector(state => state.gameSlice);

	// handle cookie set
	// React.useEffect(() => {
	// 	document.cookie =
	// 		"token=eyJhbGciOiJIUzI1NiJ9.eyJ0ZWFtSWQiOiIxMyIsImV4cCI6MTY1NzI2MDU1MiwidXNlcm5hbWUiOiJ0ZXN0In0.YbQe7Lm8VuJLR4OCRPxOXy3AHEWNkqR1HJf8jRv_T6o; max-age=99999";
	// }, []);

	//cookie parse
	function getCookie(name) {
		let value = "; " + document.cookie;
		let parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
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

			stompClient.subscribe(`/direct/${getCookie("token")}`, function (msg) {
				let json = JSON.parse(msg.body);

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

				// console.log(json);
			}); // пример
		});
	}, []);
	//routing
	React.useEffect(() => {
		if (
			actionData.dozor_status === "DEVELOP" &&
			location.pathname !== "/empty"
		) {
			navigate("/empty");
		}
		if (
			actionData.dozor_status === "PRE_START_TIME" &&
			location.pathname !== "/"
		) {
			navigate("/");
		}
		if (
			actionData.dozor_status === "ACTIVE" &&
			pointData.pointProcessingStatus === "ROUND" &&
			location.pathname !== "/code" &&
			location.pathname !== "/hint"
		) {
			navigate("/code");
		}

		if (
			actionData.dozor_status === "ACTIVE" &&
			pointData.pointProcessingStatus === "TRANSIT" &&
			location.pathname !== "/hint-point"
		) {
			navigate("/hint-point");
		}

		if (
			actionData.dozor_status === "LAST_POINT_FINISHED" &&
			location.pathname !== "/game-over"
		) {
			navigate("/game-over");
		}
	}, [
		actionData.dozor_status,
		pointData,
		pointData.pointProcessingStatus,
		location.pathname,
	]);
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
								hint={pointData?.transitDozorPoint?.onPointHint?.text}
								time={pointData.transitTime}
							/>
						}
					/>
					{/* Конец игры страница */}
					<Route path="/game-over" element={<GameOverPage />} />

					{/* Пустая страница */}
					<Route path="/empty" element={<EmptyPage />} />
				</Routes>
				<ToastContainer />
			</div>
		</div>
	);
};

export default App;
