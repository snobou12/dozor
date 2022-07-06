/** @format */

import { createSlice, current } from "@reduxjs/toolkit";

const gameSlice = createSlice({
	name: "game",
	initialState: {
		actionData: {
			dozor_status: "", //DEVELOP(DOZOR_STATUS,time="DEVELOP") - игра остановлена  отображается пустой экран, только бекграунд без всего, WAITING_ACTIVE(PRE_START_TIME,time=example"12:30:40") - первый экран с таймером, active(DOZOR_STATUS,time="ACTIVE") - игра активна, остальные экраны
			time: "",
		},
		pointData: {
			dozorId: null,
			dozorPoint: {
				dozorCodes: [],
				dozorId: null,
				enteredCodes: [],
				id: null,
				incorrectCodeCost: null,
				onPointHint: {
					id: null,
					image: null,
					sound: null,
					text: "",
				},
				roundTime: "",
				title: "",
				transitionHint: {},
				transitionToPointTime: "",
			},
			id: null,
			orderPointId: null,
			pointProcessingStatus: "",
			team: {},
			roundTime: "",
			transitTime: "",
			transitDozorPoint: {},
		},
	},
	reducers: {
		handleChangeActionData(state, action) {
			const { dozor_status, time } = action.payload;
			state.actionData.dozor_status = dozor_status;
			state.actionData.time = time;
		},
		handleChangePointData(state, action) {
			const {
				dozorId,
				dozorPoint,
				id,
				orderPointId,
				pointProcessingStatus,
				team,
			} = action.payload;
			state.pointData.dozorId = dozorId;
			state.pointData.dozorPoint = dozorPoint;
			state.pointData.id = id;
			state.pointData.orderPointId = orderPointId;
			state.pointData.pointProcessingStatus = pointProcessingStatus;
			state.pointData.team = team;
		},
		handleChangeProcessingStatus(state, action) {
			state.pointData.pointProcessingStatus = action.payload;
		},
		handleChangeRoundTime(state, action) {
			state.pointData.roundTime = action.payload;
		},
		handleChangeTransitPoint(state, action) {
			state.pointData.dozorPoint = action.payload;
		},
		handleChangeTransitTime(state, action) {
			state.pointData.transitTime = action.payload;
		},

		handleAddCode(state, action) {
			let prev = current(state.pointData.dozorPoint.enteredCodes);
			console.log(prev);
			state.pointData.dozorPoint.enteredCodes = [...prev, action.payload];
		},
		handleChangeCodes(state, action) {
			state.pointData.dozorPoint.enteredCodes = action.payload;
		},
		handleChangeDozorPointHint(state, action) {
			state.pointData.dozorPoint.onPointHint.text = action.payload;
		},
	},
});

export const {
	handleChangeProcessingStatus,
	handleChangeActionData,
	handleChangePointData,
	handleChangeRoundTime,
	handleChangeTransitPoint,
	handleChangeTransitTime,
	handleAddCode,
	handleChangeCodes,
	handleChangeDozorPointHint,
} = gameSlice.actions;
export default gameSlice.reducer;
