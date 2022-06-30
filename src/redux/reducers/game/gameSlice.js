
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
	name: "game",
	initialState: {
		actionData: {
			dozor_status: "", //DEVELOP(DOZOR_STATUS,time="DEVELOP") - игра остановлена  отображается пустой экран, только бекграунд без всего, WAITING_ACTIVE(PRE_START_TIME,time=example"12:30:40") - первый экран с таймером, active(DOZOR_STATUS,time="ACTIVE") - игра активна, остальные экраны
			time: "",
		},
        pointData:{
            dozorId:null,
            dozorPoint:{},
            id:null,
            orderPointId:null,
            pointProcessingStatus:"",
            team:{},
            roundTime:"",
            transitTime:"",
            transitDozorPoint:{},
        }
	},
	reducers: {
		handleChangeActionData(state, action) {
			const { dozor_status, time } = action.payload;
			state.actionData.dozor_status = dozor_status;
			state.actionData.time = time;
		},
        handleChangePointData(state,action){
            const {dozorId,dozorPoint,id,orderPointId,pointProcessingStatus,team}=action.payload;
            state.pointData.dozorId=dozorId;
            state.pointData.dozorPoint=dozorPoint;
            state.pointData.id=id;
            state.pointData.orderPointId=orderPointId;
            state.pointData.pointProcessingStatus=pointProcessingStatus;
            state.pointData.team=team;
        },
        handleChangeProcessingStatus(state,action){
            state.pointData.pointProcessingStatus=action.payload;
        },
        handleChangeRoundTime(state,action){
           
            state.pointData.roundTime=action.payload;
        },
        handleChangeTransitPoint(state,action){
            state.pointData.transitDozorPoint=action.payload
        },
        handleChangeTransitTime(state,action){
            state.pointData.transitTime=action.payload
        }
	},
});

export const { handleChangeProcessingStatus,handleChangeActionData,handleChangePointData,handleChangeRoundTime,handleChangeTransitPoint,handleChangeTransitTime } = gameSlice.actions;
export default gameSlice.reducer;
