const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(runningTotal, operator, currNum) {
	if (isNaN(runningTotal)) return "You Can't Divide by 0";

	switch (operator) {
		case "+":
			return add(+runningTotal, +currNum);
		case "-":
			return subtract(+runningTotal, +currNum);
		case "*":
			return multiply(+runningTotal, +currNum);
		case "/":
			if (currNum === "0" || currNum == "0.") return "Error";
			return divide(+runningTotal, +currNum);
	}
}

const buttons = document.querySelector("#button-container");
const display = document.querySelector("#display");
const divider = document.querySelector("#divider");
const inputDisplay = document.querySelector("#display h1");
const resultDisplay = document.querySelector("#display h2");

const availableOperator = ["+", "-", "/", "*"];
const isFirstOperation = () => runningTotal === "" && currNum !== "";

let displayText = "";
let runningTotal = "";
let currNum = "";
let currOperator = "";
let enteringSecondNumber = false;

let hasOperatorDeleted = false;
let isDecimalActive = false;

buttons.addEventListener("click", handleClick);

// =========== helping functions =========== //

function appendNumber(value) {
	currNum += value;
	enteringSecondNumber = false;
	console.log(currNum);
}

function updateDisplay(value) {
	displayText += value;
	inputDisplay.textContent = displayText;
}

function updateOperator(operator) {
	currOperator = operator;
	console.log(currOperator);
}

function updateDisplayResult(result) {
	resultDisplay.textContent = result;
}

function updateHistory(result) {
	let historyEntry = document.createElement("h3");
	historyEntry.textContent = `${displayText}=${result}`;
	divider.insertAdjacentElement("afterend", historyEntry);
}

const round = (string) => {
	if (string == "Error" || string == "You Can't Divide by 0") return string;
	return Number(Number(string).toFixed(4)); // used Number again to remove if no decimal is there
};

//
// Main Logic Function

function handleClick(e) {
	const btn = e.target;
	const btnType = e.target.dataset.type;
	const btnValue = e.target.dataset.value;

	const isLastCharAnOperator = availableOperator.includes(displayText.at(-1));
	const isLastCharAnDecimal = ["."].includes(displayText.at(-1));
	const readyToCalculate = runningTotal !== "" && currNum !== "";

	switch (btnType) {
		case "number":
			if (hasOperatorDeleted) return;

			appendNumber(btnValue);
			updateDisplay(btnValue);
			break;

		case "operator":
			if (runningTotal === "" && currNum === "") return;

			if (!enteringSecondNumber) calculateRunningTotal();
			else if (isLastCharAnOperator) removeDisplayLastChar();

			updateOperator(btnValue);
			updateDisplay(btnValue);

			if (hasOperatorDeleted) {
				hasOperatorDeleted = false;
				updateDisplayResult(runningTotal);
			}
			break;

		case "equal":
			if (readyToCalculate) {
				let result = operate(runningTotal, currOperator, currNum);

				result = round(result);

				updateHistory(result);
				displayText = "";
				updateDisplay(result);
				updateDisplayResult("=");
				resetOnEqual();
			}
			break;

		case "clear":
			if (isLastCharAnOperator) {
				removeDisplayLastChar();
				hasOperatorDeleted = true;
				updateDisplayResult("Enter an Operator");
				return;
			}
			if (currNum === "") return;
			if (isLastCharAnDecimal) isDecimalActive = false;

			removeDisplayLastChar();
			removeCurrNumLastChar();
			break;

		case "ac":
			allClear();
			break;

		case "dot":
			if (isDecimalActive == true) return;
			if (btnValue === ".") isDecimalActive = true;

			appendNumber(btnValue);
			updateDisplay(btnValue);
			break;
	}
}

function allClear() {
	displayText = "";
	runningTotal = "";
	currNum = "";
	currOperator = "";
	enteringSecondNumber = false;
	hasOperatorDeleted = false;

	isDecimalActive = false;

	inputDisplay.textContent = "Enter a Number";
	resultDisplay.textContent = 0;
}

function resetOnEqual() {
	displayText = "";
	runningTotal = "";
	currNum = "";
	currOperator = "";
	enteringSecondNumber = false;
	hasOperatorDeleted = false;

	isDecimalActive = false;
}

function removeDisplayLastChar() {
	displayText = displayText.slice(0, -1);
	inputDisplay.textContent = displayText;
}

function removeCurrNumLastChar() {
	currNum = currNum.slice(0, -1);
}

function calculateRunningTotal() {
	runningTotal = isFirstOperation()
		? currNum
		: operate(runningTotal, currOperator, currNum);

	runningTotal = round(runningTotal);

	updateDisplayResult(runningTotal);
	currNum = "";
	enteringSecondNumber = true;
	isDecimalActive = false;
}
