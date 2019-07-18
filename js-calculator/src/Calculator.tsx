import React, { useState } from "react";
import "./App.scss";

const Calculator: React.FC = () => {
	const [acc, setAcc] = useState<number>(0);
	const [cur, setCur] = useState<number>(0);
	const [type, setType] = useState<string>("");
	const [display, setDisplay] = useState<string>("0");

	const buttonsValues = [
		"AC",
		"CE",
		"/",
		"*",
		"7",
		"8",
		"9",
		"-",
		"4",
		"5",
		"6",
		"+",
		"1",
		"2",
		"3"
	];

	/**
	 *
	 * @description Algebraic operations of the given type
	 * @param {number} acc Accumulative value
	 * @param {number} cur Current value
	 * @param {string} type Type of algebraic operation +, -, * or /
	 * @returns Operation's result
	 */
	function operation(acc: number, cur: number, type: string): number {
		switch (type) {
			case "+":
				return (acc += cur);
			case "-":
				return (acc -= cur);
			case "*":
				return (acc *= cur);
			case "/":
				return (acc /= cur);
			default:
				throw Error("Invalid operation Type");
		}
	}

	function handelClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		if (e.currentTarget.value) {
			const input: string = e.currentTarget.value;

			if (input === "+" || input === "-" || input === "*" || input === "/") {
				if (cur !== 0) {
					setAcc(Number(cur));
					setCur(0);
					setType(input);
					setDisplay("0");
				}
			} else if (input === "=") {
				if (acc !== 0 && cur !== 0 && type !== "") {
					let operationResult = operation(acc, cur, type);
					setAcc(operationResult);
					setCur(operationResult);
					setType("");
					setDisplay(operationResult.toString());
				}
			} else if (input === ".") {
				setDisplay(display + input);
			} else if (input === "AC") {
				setCur(0);
				setAcc(0);
				setType("");
				setDisplay("0");
			} else if (input === "CE") {
				setCur(0);
				setDisplay("0");
			} else {
				if (display === "0") {
					setDisplay(input);
					setCur(Number(input));
				} else {
					setDisplay(display + input);
					setCur(Number(display + input));
				}
			}
		}
	}

	return (
		<main>
			<div id="calculator">
				<h1>Super Calculator</h1>
				<div id="screen">
					<form action="">
						<input type="text" id="display" value={display} readOnly />
					</form>
				</div>
				<div id="pad">
					{buttonsValues.map(value => (
						<button
							key={value}
							value={value}
							onClick={handelClick}
							className="btn"
						>
							{value}
						</button>
					))}

					<button value="=" className="vertical-btn" onClick={handelClick}>
						=
					</button>

					<button value="0" className="horizontal-btn" onClick={handelClick}>
						0
					</button>

					<button
						value="."
						className="horizontal-btn btn3"
						onClick={handelClick}
					>
						.
					</button>
				</div>
			</div>
		</main>
	);
};

export default Calculator;
