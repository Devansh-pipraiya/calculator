const buttons = document.querySelector("#button-container")
const availableOperator = ["+", "-", "/", "*"];
const input = [];
let num1 , num2 , operator;



const add = (num1,num2) => num1 + num2 ;
const subtract = (num1,num2) => num1 - num2 ;
const multiply = (num1,num2) => num1 * num2 ;
const divide = (num1,num2) => num1 / num2 ;


function operate(num1 , operator, num2){
    switch(operator){
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
    }
}



buttons.addEventListener("click", handleClick);
function handleClick(e){

    const btn = e.target;
    const btnType = e.target.dataset.type;
    const readyToEvaluate = btn.classList.contains("equal") 
                            && !Number.isNaN(num1) 
                            && num1 !== undefined 
                            && operator !== undefined;

    if(!btn.classList.contains("button")) return;

    switch(btnType){

        case "number":
            input.push(btn.dataset.value);
            num1 = +input[input.length - 2];
            num2 = +input[input.length - 1];
            console.log(input);
            console.log(num1, num2);
            break;

        case "operator":
            operator = btn.dataset.value;
            console.log(operator);
            break;

        case "equal":
            if (readyToEvaluate){
                console.log("operate function called with", num1, operator, num2);
                console.log("answer => ", operate(num1, operator, num2));
            }
            break;

    }
}