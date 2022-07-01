
import React, { useLayoutEffect } from "react";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { handleChangeDesign } from "../redux/reducers/design/designSlice";

export function useWindowSize() {
	const dispatch = useDispatch();
	const dispatchSize = React.useCallback(
		debounce(([width, height]) => {
			let device =
				width > 1200
					? "desktop"
					: width <= 1200 && width > 768
					? "tablet"
					: "mobile";
			let multiplier =0;
			if(device === "desktop" || device === "tablet" ){
				multiplier= 768 / 375;
			}
			else{
				multiplier= width / 375;
			}
			let fontSizeCalc=Math.ceil(10 * multiplier, -2);
			dispatch(handleChangeDesign({device,fz:fontSizeCalc}));
		}, 500),
		[]
	);
	function updateSize() {
		dispatchSize([window.innerWidth, window.innerHeight]);
	}
	useLayoutEffect(() => {
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
}
