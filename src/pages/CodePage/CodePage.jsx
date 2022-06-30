/** @format */

import axios from "axios";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { useCode } from "../../hooks/useCode";
import "./CodePage.scss";
const CodePage = ({ time, enteredCodes }) => {
	const [codes, setCodes] = React.useState(["", "", "", "", "", ""]);
	const { isLoading, data, error, refetch } = useCode(codes.join(""));

	const handleChangeInput = e => {
		const indexId = Number(e.target.getAttribute("id")) - 1;
		const value = e.target.value.toUpperCase();

		setCodes(prev => {
			const newArr = [...prev];
			newArr[indexId] = value;
			return newArr;
		});
		if (e.target.value && e.target.nextSibling) {
			e.target.nextSibling.focus();
		}
	};

	const inputs = [
		{ id: 1, value: codes[0] },
		{ id: 2, value: codes[1] },
		{ id: 3, value: codes[2] },
		{ id: 4, value: codes[3] },
		{ id: 5, value: codes[4] },
		{ id: 6, value: codes[5] },
	];
	const handlePostCode = () => {
		if (codes.every(el => !!el)) {
			refetch();
		}
	};
	function getDifference() {
		if (enteredCodes.length > 0) {
			return enteredCodes.reduce((acc, code) => {
				return code.correct ? acc + code.cost : acc - code.cost;
			}, 0);
		}
		return null;
	}

	return (
		<div className="page_code page">
			<div className="page__title">
				<span>камни бесконечности</span>
				<Link to="/hint" className="page__start_help">
					открыть подсказку
				</Link>
			</div>

			<div className="page_content">
				<div className="page_timer">
					<div className="timer_time">{time}</div>
				</div>
				<div className="page_code__code">
					<div className="code__title">введите код</div>
					<div className="code__inputs">
						{inputs.map((inpt, idx) => (
							<input
								key={`${inpt.id}:${idx}`}
								className={`code_input_${inpt.id}`}
								id={String(inpt.id)}
								type="tel"
								value={inpt.value}
								placeholder=""
								maxLength={1}
								onChange={handleChangeInput}
							/>
						))}
					</div>
					<div className="code__submit">
						<button onClick={handlePostCode} className="custom_btn">
							отправить
						</button>
					</div>
				</div>
				<div className="page_code__table">
					<div className="code__table_title">введеные коды</div>
					<div className="code__table_upper">
						<span>раунд 1</span>
						<span>{getDifference() || 0} очков</span>
					</div>
					<div className="code__table_codes">
						{enteredCodes.length > 0 &&
							enteredCodes.map((code, idx) => (
								<div key={idx} className="code__table_code">
									<span>{code.value}</span>
									<span
										className={classNames("code__table_score", {
											"code__table_score--minus": !code.correct,
										})}
									>
										{!code.correct && "-"}
										{code.cost}
									</span>
								</div>
							))}
					</div>
				</div>
			</div>
			<div className="page_empty"></div>
		</div>
	);
};

export default CodePage;
