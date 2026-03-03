const buttons = document.querySelector("#button-container")
const availableOperator = ["+", "-", "/", "x"];

let num1  , num2 , operator;



const add = (num1,num2) => num1 + num2 ;
const subtract = (num1,num2) => num1 - num2 ;
const multiply = (num1,num2) => num1 * num2 ;
const divide = (num1,num2) => num1 / num2 ;


function operate(num1 , operator, num2){
    switch(operator){
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "x": return multiply(num1, num2);
        case "/": return divide(num1, num2);
    }
}



buttons.addEventListener("click", handleClick);
function handleClick(e){

    const btn = e.target;
    const btnType = e.target.dataset.type;
    const btnValue = e.target.dataset.value;
    const readyToEvaluate = btn.classList.contains("equal") 
                            && !Number.isNaN(num1) 
                            && num1 !== undefined 
                            && operator !== undefined;

    if(!btn.classList.contains("button")) return;


    switch(btnType){

        case "number":

            if (num1 && operator){
                appendNum2(btnValue);
            }else{
                appendnum1(btnValue);
            }
            break;


        case "operator":

            if(operator === btnValue || !num1 ){return};

            operator = btn.dataset.value;
            console.log(operator);

            // h1.appendChild(document.createTextNode(btn.dataset.value));
            updateDisplay();

            break;

        case "equal":
            if (readyToEvaluate){

                let result = operate(num1, operator, num2);

                console.log("operate function called with", num1, operator, num2);
                console.log(result);

                defaulth2.remove();
                h2.replaceChildren(document.createTextNode(result));
            }
            break;

    }
}


const h1 = document.querySelector("#display h1");
const defaulth1 = document.querySelector("#display h1 span")
const h2 = document.querySelector("#display h2");
const defaulth2 = document.querySelector("#display h2 span")
const divider = document.querySelector("#divider");
const history = document.querySelectorAll("#display h3");



function appendnum1(value){
    if (num1 == undefined){
        num1 = value;
    }
    else{
        num1 = num1 + value;
    }
    updateDisplay();
}


function appendNum2(value){
    if (num2 == undefined){
        num2 = value;
    }
    else{
        num2 = num2 + value;
    }
    updateDisplay();
}


function updateDisplay() {
  let displayText = "";

  if (num1 !== undefined) {
    displayText += num1;
  }

  if (operator) {
    displayText += `${operator}`;
  }

  if (num2 !== undefined) {
    displayText += num2;
  }

  h1.textContent = displayText.trim();
}