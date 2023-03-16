const calculatorContainer = document.querySelector('.calculator-container');
const display = document.querySelector('.display');
const operators = ["/", "x", "-", "+"];

let displayValue = "";
let operator = "";
let x = "";
let y = "";
let equalsClicked = false;
let operatorClicked = false;

// calculator functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y == 0) {
        return 'Cannot divide by zero';
    }
    return x / y;
}

function operate(operator, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
    switch (operator) {
        case "divide": return divide(x, y);
        case "multiply": return multiply(x, y);
        case "subtract": return subtract(x, y);
        case "add": return add(x, y);
    }
}

//helper functions

function checkValid(nextVal) {
    if (operators.includes(displayValue[displayValue.length - 1]) && nextVal.dataset.operator) {
        return false;
    } else {
        return true;
    }
};

function clear() {
    displayValue = "";
    display.textContent = "";
    x = "";
    y = "";
    operatorClicked = false;
    equalsClicked = false;
}

function deleteLastNum() {
    if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
    }
}

function handleOperatorClick(btn) {
    if (equalsClicked) {
        x = display.textContent;
        equalsClicked = false;
    } else if (operatorClicked) {
        y = displayValue;
        x = operate(operator, x ,y);
        display.textContent = x;
    } else {
        x = displayValue;
    }

    operator = btn.value;
    displayValue = "";
    operatorClicked = true;
}

calculatorContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains("calculator-button")) {
        let btn = event.target.dataset;
        
        if (!checkValid(event.target) || btn.value == "clear") {
            clear()
        } else if (btn.value == "delete") {
            deleteLastNum();
        } else {
            if (btn.operator) {
               handleOperatorClick(btn)
            } else if (btn.value == "equals" && operatorClicked) {
                equalsClicked = true;
                y = displayValue;
                display.textContent = operate(operator, x, y);
            } else if (!btn.operator && btn.value != "equals") {
                if (equalsClicked) {
                    clear();
                    operatorClicked = false;
                }
                displayValue+=event.target.innerText;
                display.textContent = displayValue;
                equalsClicked = false;
            }         
        }
    } 

});




