const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(runningTotal, operator, currNum) {
	switch (operator) {
		case "+":
			return add(+runningTotal, +currNum);
		case "-":
			return subtract(runningTotal, currNum);
		case "*":
			return multiply(runningTotal, currNum);
		case "/":
			return divide(runningTotal, currNum);
	}
}

const buttons = document.querySelector("#button-container");
const display = document.querySelector("#display");
const inputDisplay = document.querySelector("#display h1");

const availableOperator = ["+", "-", "/", "*"];

let displayText = "";
let runningTotal = "";
let currNum = "";
let currOperator = "";
let enteringSecondNumber = false;

buttons.addEventListener("click", handleClick);

// =========== helping functions =========== //

function appendNumber(value) {
	if (enteringSecondNumber === false && currOperator) {
	} else if (enteringSecondNumber === true && runningTotal == "") {
		runningTotal = currNum;
		currNum = "";
	}

	currNum += value;
	console.log(currNum);
}

function updateDisplay(value) {
	displayText += value;
	inputDisplay.textContent = displayText;
}

function updateOperator(operator) {
	if (runningTotal == "") {
		enteringSecondNumber = true;
	} else if (runningTotal !== "" && currOperator !== "") {
		enteringSecondNumber = true;
	} else {
		enteringSecondNumber = false;
	}

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
			if (enteringSecondNumber == true && readyToCalculate) {
				let result = operate(runningTotal, currOperator, currNum);
				runningTotal = result;
				currNum = "";
				console.log(result, runningTotal, currOperator, currNum);
			}
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
