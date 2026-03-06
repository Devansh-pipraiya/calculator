const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(runningTotal, operator, currNum) {
	switch (operator) {
		case "+":
			return add(+runningTotal, +currNum);
		case "-":
			return subtract(+runningTotal, +currNum);
		case "*":
			return multiply(+runningTotal, +currNum);
		case "/":
			return divide(+runningTotal, +currNum);
	}
}

const buttons = document.querySelector("#button-container");
const display = document.querySelector("#display");
const inputDisplay = document.querySelector("#display h1");

const availableOperator = ["+", "-", "/", "*"];
const isFirstOperation = () => runningTotal == "" && currNum !== "";

let displayText = "";
let runningTotal = "";
let currNum = "";
let currOperator = "";
let enteringSecondNumber = false;

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

function handleClick(e) {
	const btn = e.target;
	const btnType = e.target.dataset.type;
	const btnValue = e.target.dataset.value;

	const readyToCalculate =
		currOperator !== "" && runningTotal !== "" && currNum !== "";

	switch (btnType) {
		case "number":
			appendNumber(btnValue);
			updateDisplay(btnValue);
			break;

		case "operator":
			!enteringSecondNumber
				? calculateRunningTotal()
				: removeDisplayLastChar();
			updateOperator(btnValue);
			updateDisplay(btnValue);
			break;

		case "equal":
			if (readyToCalculate) {
				let result = operate(runningTotal, currOperator, currNum);
				updateDisplay(btnValue);
				updateDisplay(result);
				allClear();
			}
			break;

		case "clear":
			removeDisplayLastChar();
			removeCurrNumLastChar();
			break;

		case "ac":
			allClear();
			updateDisplay(0);
			allClear();
			break;
	}
}

function allClear() {
	displayText = "";
	runningTotal = "";
	currNum = "";
	currOperator = "";
	enteringSecondNumber = false;
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

	currNum = "";
	enteringSecondNumber = true;
}
