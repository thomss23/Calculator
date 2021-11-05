const PLUS = "+";
const MINUS = "-";
const DIVIDE = "/";
const MULTIPLY = "*";

const EQUALS = "=";

let displayValue = "";

let calculation = {
    operandOne:null,
    operator:"",
    operandTwo:null,
    hasPressedEquals:false
}


function add(a, b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, operand1, operand2) {

    switch(operator) {
        case PLUS: 
            return add(operand1, operand2);
        case MINUS:
            return subtract(operand1, operand2);
        case MULTIPLY:
            return multiply(operand1, operand2);
        case DIVIDE:
            return divide(operand1, operand2);
    }

}

const operands = document.querySelectorAll('.operand');
const display = document.querySelector('.calculation');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

operands.forEach((op) => {
    op.addEventListener('click', () => {

        if(displayValue == "0" && op.getAttribute("value") != ".") {
            return;
        }

        if(displayValue.length < 19) {
            if(op.getAttribute("value") == "." && !displayValue) {
                displayValue = "0.";
            } else {
                displayValue = displayValue + op.getAttribute("value");
            }

            if(calculation.operator == "-" && !displayValue.startsWith("-")) {
                display.textContent = "-" + displayValue;
            } else {
                display.textContent = displayValue;
            }

        }

        if(calculation.hasPressedEquals) {
            reset();
            calculation.hasPressedEquals = false;
        }

    });
})

operators.forEach((op) => {

    op.addEventListener('click', ()=> {

        // if(!displayValue) displayValue = "0";

        if(!calculation.operator && !calculation.hasPressedEquals) {
            calculation.operandOne = parseFloat(displayValue);
            calculation.operator = op.getAttribute("value");

        } else if(!calculation.operator && calculation.hasPressedEquals) {
            calculation.operator = op.getAttribute("value");
            calculation.hasPressedEquals = false;
        }
        else {
            calculation.operandTwo = parseFloat(displayValue);
            let result = operate(calculation.operator, calculation.operandOne, calculation.operandTwo);
            if(result == Infinity || isNaN(result) || result == -Infinity) {
                display.textContent = "error";
                reset();
            } else if(getNumberOfDigits(result) > 19) {
                display.textContent = "too big to display";
                reset();
            }
            else {
                calculation.operandOne = result;
                display.textContent = calculation.operandOne;
                calculation.operator = op.getAttribute("value");
            }

        }
        displayValue="";
    })
});

equals.addEventListener('click', () => {

    if(!displayValue) displayValue = "0";

    if(!calculation.operator) return;
    calculation.operandTwo = parseFloat(displayValue);
    let result = operate(calculation.operator, calculation.operandOne, calculation.operandTwo);
    if(result === Infinity || isNaN(result) || result == -Infinity) {
        display.textContent = "error";
        reset();
    } else if(getNumberOfDigits(result) > 19) {
        display.textContent = "too big to display";
        reset();
    }
    else {
        calculation.operandOne = result;
        display.textContent = calculation.operandOne;
        displayValue = "";
        calculation.operator="";
        calculation.hasPressedEquals = true;
    }
    displayValue="";

});


clear.addEventListener('click', () => {
    reset();
    displayValue="";
    display.textContent = "0";

})

backspace.addEventListener('click', () => {
    if(!displayValue) return;
    displayValue = displayValue.slice(0, displayValue.length - 1);
    display.textContent = displayValue;

})

function reset() {
    calculation.operandOne = null;
    calculation.operator = "";
    calculation.operandTwo = null;
}

function getNumberOfDigits(number) {
    return number.toString().length;
}
