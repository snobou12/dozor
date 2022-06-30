
import React from "react";
import "./StartPage.scss";
const StartPage = ({time}) => {
	return (
		<div className="page_start page">
			<div className="page__title">камни бесконечности</div>
			<div className="page_content">
				<div className="page_timer">
					<div className="timer_upper">до старта:</div>
					<div className="timer_time">{time}</div>
				</div>
				<div className="page_start__message">
					сегодня я вас отправлю в прошлое, чтобы вы нашли и собрали это
					изобретение, и принесли его мне
				</div>
			</div>

			<div className="page_empty"></div>
		</div>
	);
};

export default StartPage;
