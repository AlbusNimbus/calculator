/*
TODOS:
    -Need nicer precisions
    -Overflow fix
*/
const buttons = document.querySelectorAll('.button');
const bottomDisplay = document.querySelector('.bot-screen');
const topDisplay = document.querySelector('.top-screen');

var operand1 = null
var operand2 = null
var result = null
var operator = ""
var state = "start"
const specialButtons = ["backspace", "clear", "clearentry", "sign"]

buttons.forEach(function (button) {
    button.addEventListener('click', (e) => {
        if(specialButtons.includes(button.id)){
            button.addEventListener('click', window[button.id]);
        }
        stateMachine(e.target.innerText);
        console.log(state)
    });
});
    


//State Machine Logic
function stateMachine(input) {
    if (state === "start") {
        if (isNonZero(input) ) {
            clearBottomDisplay();
            appendBottomDisplay(input);
            state = "accumulateDigits";
            return
        }if(input === "."){
            appendBottomDisplay(input);
            state = "accumulateDigits";
            return
        }

    }
    if (state === "accumulateDigits") {
        if (!isNaN(input) || input === ".") {
            appendBottomDisplay(input);
        }
        if (isOperator(input)) {
            shiftDisplay(input);
            operand1 = parseFloat(bottomDisplay.innerText);
            operator = input;
            clearBottomDisplay();
            state = "pendingOperator"
        }
        return
    }
    if(state === "accumulateDecimal"){
        if (!isNaN(input)) {
            appendBottomDisplay(input);
        }
        if (isOperator(input)) {
            shiftDisplay(input);
            operand1 = parseFloat(bottomDisplay.innerText);
            operator = input;
            clearBottomDisplay();
            state = "pendingOperator"
        }
        return
    }
    if (state === "pendingOperator") {
        if (!isNaN(input) || input === ".") {
            appendBottomDisplay(input);
        }
        if (isOperator(input)) {
            if (bottomDisplay.innerText === "") {
                updateOperator(input)
                operator = input;
                return
            }
            operand2 = parseFloat(bottomDisplay.innerText);
            calculate();
            operator = input;
            operand1 = result
            updateBottomDisplay(result);
            shiftDisplay(input, false);
            clearBottomDisplay();
        }
        if (input === "=" && bottomDisplay.innerText ) {
            operand2 = parseFloat(bottomDisplay.innerText);
            calculate();
            shiftDisplay(input, true);
            updateBottomDisplay(result);
            state = "result"
        }
        return
    }
    if (state === "result") {
        if (!isNaN(input)) {
            clearBottomDisplay();
            appendBottomDisplay(input);
            state = "accumulateDigits"
        }
        if (isOperator(input)) {
            shiftDisplay(input);
            operand1 = parseFloat(bottomDisplay.innerText);
            operator = input;
            clearBottomDisplay();
            state = "pendingOperator"
        }
        if (input === "=") {
            operand1 = parseFloat(bottomDisplay.innerText);
            calculate();
            shiftDisplay(input, true);
            updateBottomDisplay(result);
        }
    }
}

//Displays
function appendBottomDisplay(input) {
    
    if (bottomDisplay.innerText === result) {
        clearBottomDisplay();
    }
    if(bottomDisplay.innerText.length > 11){
        return;
    }
    if(input === "."){
        if(maxOneDot()) {
        bottomDisplay.innerText += input;
        fontSizeAdjuster();
        }
        return
    }
    if (bottomDisplay.innerText[0] != "0" || bottomDisplay.innerText.includes(".")) {
        bottomDisplay.innerText += input;
        fontSizeAdjuster();
        return
    }
}

function updateBottomDisplay(input) {
    bottomDisplay.innerText = roundResult(parseFloat(input));

}
function shiftDisplay(input, final) {
    if (final) {
        topDisplay.innerText = operand1 + " "  + operator + " " + operand2 + " =";
        return
    }
    topDisplay.innerText = bottomDisplay.innerText + " " + input;
}
function fontSizeAdjuster(){
    var asdf = Number(bottomDisplay.style.fontSize.substring(0,2))
    if(bottomDisplay.innerText.length > 9){
        bottomDisplay.style.fontSize = (asdf - 1).toString() + "px";
    }else{
        bottomDisplay.style.fontSize = "40px"
    }
}
//Special buttons
function sign() {
    if (bottomDisplay.innerText[0] === "-") {
        bottomDisplay.innerText = bottomDisplay.innerText.substring(1,)
        return
    }
    bottomDisplay.innerText = "-" + bottomDisplay.innerText
}
function clear() {
    bottomDisplay.innerText = "0"
    topDisplay.innerText = ""
    operand1 = null
    operand2 = null
    operator = "";
    result = null;
    state = "start";

}
function backspace() {
    bottomDisplay.innerText = bottomDisplay.innerText.substring(0, bottomDisplay.innerText.length - 1)
    if (bottomDisplay.innerText === "") {
        bottomDisplay.innerText += "0"
    }
}


//Maths
function calculate() {
    switch (operator) {
        case "+": add(); return;
        case "-": subtract(); return;
        case "×": multiply(); return;
        case "÷": divison(); return;
    }
}

function add() {
    result = roundResult(parseFloat(operand1 + operand2));
}
function subtract() {
    result = roundResult(parseFloat(operand1 - operand2));
}
function multiply() {
    result = roundResult(parseFloat(operand1 * operand2));
}
function divison() {
    result = roundResult(parseFloat(operand1 / operand2));
}

//Utils
function roundResult(number) {
    return Math.round(number * 100)/100
  }

function clearBottomDisplay() {
    bottomDisplay.innerText = "";
}

function clearentry() {
    bottomDisplay.innerText = "0"
    operator = "";
}
function updateOperator(input) {
    topDisplay.innerText = topDisplay.innerText.substring(0, topDisplay.innerText.length - 1);
    topDisplay.innerText += " " + input;
}

function maxOneDot(){
     return bottomDisplay.innerText.split('.').length-1 < 1
}
function isOperator(input) {
    if (["+", "-", "×", "÷"].includes(input)) return true;
}
function isNonZero(input) {
    if (10 > input && input > 0) return true;
}

