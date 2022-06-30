/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./HintPage.scss";
const HintPage = ({ time, hint }) => {
	return (
		<div className="page_hint page">
			<div className="page__title">камни бесконечности</div>
			<div className="page_content">
				<div className="page_timer">
					<div className="timer_time">{time}</div>
				</div>
				<div className="page_hint__hint">{hint}</div>
				<div className="page_hint__back">
					<Link className="custom_btn" to={-1}>
						вернуться
					</Link>
				</div>
			</div>

			<div className="page_empty"></div>
		</div>
	);
};

export default HintPage;
