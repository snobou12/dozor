
import { createSlice } from "@reduxjs/toolkit";

const designSlice = createSlice({
	name: "design",
	initialState: {
		device: "desktop",
	},
	reducers: {
		handleChangeDevice(state, action) {
			state.device = action.payload;
		},
	},
});

export const { handleChangeDevice } = designSlice.actions;
export default designSlice.reducer;
