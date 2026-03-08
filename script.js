// Basic functions -> used by operate()
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Selectors
const buttons = document.querySelector("#button-container");
const display = document.querySelector("#display");
const divider = document.querySelector("#divider");
const inputDisplay = document.querySelector("#display h1");
const resultDisplay = document.querySelector("#display h2");

// ================================================== //
// =========== Initial Variables settings =========== //
// ================================================== //

const availableOperator = ["+", "-", "/", "*"];

let displayText = "";
let runningTotal = "";
let currNum = "";
let currOperator = "";
let enteringSecondNumber = false;

let hasOperatorDeleted = false;
let isDecimalActive = false;

// ================================================== //
// ============     Helper Functions     ============ //
// ================================================== //

const isFirstOperation = () => runningTotal === "" && currNum !== ""; // returns true/false

const removeCurrNumLastChar = () => (currNum = currNum.slice(0, -1));

const removeDisplayLastChar = () => {
	displayText = displayText.slice(0, -1);
	inputDisplay.textContent = displayText;
};

// cut large decimal numbers
const round = (string) => {
	if (string == "Error" || string == "You Can't Divide by 0") return string;

	// converted to Number again to remove if no decimal value present (1.3000 to 1.3)
	return Number(Number(string).toFixed(4)); // ex -> 1.3333333333 to 1.3333
};

//
// ========================   To update on calculator display    ======================== //

function updateDisplay(value) {
	displayText += value;
	inputDisplay.textContent = displayText;
}

const updateDisplayResult = (result) => (resultDisplay.textContent = result);

function updateHistory(result) {
	let historyEntry = document.createElement("h3");
	historyEntry.textContent = `${displayText}=${result}`;
	divider.insertAdjacentElement("afterend", historyEntry);
}

//
// =============     To update Variables and Display it     ========== //
//

function appendNumber(value) {
	currNum += value;
	enteringSecondNumber = false;
	updateDisplay(value);
}

function updateOperator(operator) {
	currOperator = operator;
	updateDisplay(operator);
}

//
// ========     either returns the calculated result or error msg     ======== //
// ==============     handles Nan & divide by 0 case     ===================== //

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
			if (+currNum === "0") return "Error";
			return divide(+runningTotal, +currNum);
	}
}

// ================    ensure correct data flow logic and calculation    ================ //

function calculateRunningTotal() {
	runningTotal = isFirstOperation()
		? currNum
		: operate(runningTotal, currOperator, currNum);

	runningTotal = round(runningTotal);

	updateDisplayResult(runningTotal);
	currNum = "";
	enteringSecondNumber = true; // after this now you can enter second/next number & it will be stored in currNum variable
	isDecimalActive = false;
}

//
// ====================================================================================== //
// =========================     Main Logic Function    ================================= //
//======================================================================================= //

buttons.addEventListener("click", handleClick);

function handleClick(e) {
	const btn = e.target;
	const btnType = e.target.dataset.type;
	const btnValue = e.target.dataset.value;

	const isLastCharAnOperator = availableOperator.includes(displayText.at(-1));
	const isLastCharAnDecimal = displayText.at(-1) === ".";
	const readyToCalculate = runningTotal !== "" && currNum !== "";

	switch (btnType) {
		case "number":
			if (hasOperatorDeleted) return; //                      -> edge case when entering second num without operator

			appendNumber(btnValue);
			break;

		case "operator":
			if (runningTotal === "" && currNum === "") return; //    -> edge case = if first thing is user enter operator

			if (!enteringSecondNumber)
				calculateRunningTotal(); //                         //-> make space for entering second num
			else if (isLastCharAnOperator) removeDisplayLastChar(); //-> To update new operator

			updateOperator(btnValue);

			if (hasOperatorDeleted) {
				hasOperatorDeleted = false; //                        -> edgde case reset when using backspace
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
				removeDisplayLastChar(); //                      -> edge case of deleting operator
				hasOperatorDeleted = true;
				updateDisplayResult("Enter an Operator");
				return;
			}
			if (currNum === "") return; //                       -> edge case if whole currNum string is deleted
			if (isLastCharAnDecimal) isDecimalActive = false; // -> edge case of reseting decimal state

			removeDisplayLastChar();
			removeCurrNumLastChar();
			break;

		case "ac":
			allClear();
			break;

		case "dot":
			if (isDecimalActive == true) return; //                -> egde case of decimal
			isDecimalActive = true;

			appendNumber(btnValue);
			break;
	}
}

//
//
// ================ Reset To Initial states =============== //

function resetOnEqual() {
	displayText = "";
	runningTotal = "";
	currNum = "";
	currOperator = "";
	enteringSecondNumber = false;

	hasOperatorDeleted = false;
	isDecimalActive = false;
}

function allClear() {
	resetOnEqual();

	inputDisplay.textContent = "Enter a Number";
	resultDisplay.textContent = 0;
	display.querySelectorAll("h3").forEach((h3) => h3.remove());
}

//============================================================================================= //
// =====================     KEYBOARD EVENT HANDLING      ===================================== //

const availableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

document.addEventListener("keydown", handleKey);
function handleKey(e) {
	let btn;

	if (availableNumbers.includes(e.key)) {
		btn = document.querySelector(
			`button[data-type="number"][data-value="${e.key}"]`,
		);
	} else if (availableOperator.includes(e.key)) {
		btn = document.querySelector(
			`button[data-type="operator"][data-value="${e.key}"]`,
		);
	} else if (e.key === "Enter") {
		btn = document.querySelector(`button[data-type="equal"]`);
	} else if (e.key === "Shift") {
		btn = document.querySelector(`button[data-type="clear"]`);
	} else if (e.key === "Delete") {
		btn = document.querySelector(`button[data-type="ac"]`);
	} else if (e.key === ".") {
		btn = document.querySelector(`button[data-type="dot"]`);
	}

	if (btn) {
		btn.click();
		btn.classList.add("key-active");
		setTimeout(() => btn.classList.remove("key-active"), 100);
	}
}
