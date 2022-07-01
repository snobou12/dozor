
import { createSlice } from "@reduxjs/toolkit";

const designSlice = createSlice({
	name: "design",
	initialState: {
		device: "desktop",
		fontSize:10,
	},
	reducers: {
		handleChangeDesign(state, action) {
			let {device, fz} = action.payload;
			state.device = device;
			state.fontSize=fz;
		},
	},
});

export const { handleChangeDesign } = designSlice.actions;
export default designSlice.reducer;
