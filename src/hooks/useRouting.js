
import React, { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useRouting(actionData,pointData) {
    const navigate = useNavigate();
    const location = useLocation();
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
}
