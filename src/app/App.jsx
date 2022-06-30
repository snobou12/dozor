/** @format */

import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";
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
import { CodePage, Empty, HintPage, PointHintPage, StartPage } from "../pages";
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
	const { device } = useSelector(state => state.designSlice);
	useWindowSize(); // если нужно будет добавить рендер только для разных девайсов
	const { actionData, pointData } = useSelector(state => state.gameSlice);

	// React.useEffect(() => {
	// 	document.cookie =
	// 		"token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdHJ1c3R5YXBwLmNvbS8iLCJzdWIiOiJ0ZXN0IiwiZXhwIjoxNjU3MDg1Mzk2fQ.LrutvrZR06sqdKedg8-qssNDa2NBtr5bzb7cnHMV448; max-age=99999";
	// }, []);
	React.useEffect(() => {
		const socket = new SockJS("https://solbaumanec.ru/dozor");
		const stompClient = Stomp.over(socket);
		// stompClient.debug = null; // Отключить сообщения от stomp
		stompClient.connect({}, () => {
			stompClient.subscribe("/action", function (msg) {
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

				// console.log(json);
			});

			stompClient.subscribe("/directlyTeam/blue", function (msg) {
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

				// console.log(json);
			}); // пример
		});
	}, []);

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
	}, [
		actionData.dozor_status,
		pointData,
		pointData.pointProcessingStatus,
		location.pathname,
	]);

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

					{/* Пустая страница */}
					<Route path="/empty" element={<Empty />} />
				</Routes>
				<ToastContainer />
			</div>
		</div>
	);
};

export default App;
