const buttons = document.querySelectorAll('.button');
const bottomDisplay = document.querySelector('.bot-screen');
const topDisplay = document.querySelector('.top-screen');

var operand1 = null;
var operand2 = null;
var result = null;
var currentOperator = "";

buttons.forEach(function (button) {
    button.addEventListener('click', window[button.id]);
});

function appendBottomDisplay(entry) {
    bottomDisplay.innerText += entry;
}

function sign() {
    if (bottomDisplay.innerText[0] === "-") {
        bottomDisplay.innerText = bottomDisplay.innerText.substring(1,)
        return
    }
    bottomDisplay.innerText = "-" + bottomDisplay.innerText
}

function clearentry() {
    bottomDisplay.innerText = "0"
    operand1 = null
    operand2 = null
    currentOperator = "";
}

function clear() {
    bottomDisplay.innerText = "0"
    topDisplay.innerText = ""
    operand1 = null
    operand2 = null
    currentOperator = "";
    result = null;

}
function backspace() {
    bottomDisplay.innerText = bottomDisplay.innerText.substring(0, bottomDisplay.innerText.length - 1)
    if (bottomDisplay.innerText === "") {
        bottomDisplay.innerText += "0"
    }
}

function digit(e) {
    if (bottomDisplay.innerText[0] === "0" && !bottomDisplay.innerText.includes(".")) {
        bottomDisplay.innerText = e.target.innerText;
        return
    }
    if(operand2!=null){
        bottomDisplay.innerText= e.target.innerText
        operand2=null
        return
    }
    appendBottomDisplay(e.target.innerText)
}

function divison(e) {
    operatorButton(e.target.innerText,"div")
}

function operatorButton(e,operator) {
    if (operand1 == null) {
        operand1 = parseFloat(bottomDisplay.innerText)
        topDisplay.innerText = bottomDisplay.innerText + " " + e
        currentOperator = operator
        bottomDisplay.innerText = "0"
        return
    }
    if (operand1 != null) {
        operand2 = parseFloat(bottomDisplay.innerText)
        console.log(operator)
        switch(operator){
            case "div": case"mul": case"sub": case"add":
                console.log("pending")
                operatePending(e,currentOperator)
                break
            case "equals":
                console.log("eq for" + currentOperator)
                operate(currentOperator)
        }
        bottomDisplay.innerText = result
        return
    }
}
function operatePending(e,operator){
    switch(operator){
    case "div":
        currentOperator = "div"
        result = operand1 / operand2
        topDisplay.innerText = result + " " + e
        break
    case "mul":
        currentOperator = "mul"
        result = operand1 * operand2
        topDisplay.innerText = result + " " + e
        break
    case "sub":
        currentOperator = "sub"
        result = operand1 - operand2
        topDisplay.innerText = result + " " + e
        break
    case "add":
        currentOperator = "add"
        result = operand1 + operand2
        topDisplay.innerText = result + " " + e
        break
    }
}
function operate(operator){
    switch(operator){
        case "div":
            topDisplay.innerText = operand1 +  " / "  + operand2 + " ="
            result = operand1 / operand2
            operand1 = result
            break
        case "mul":
            topDisplay.innerText = operand1 +  " × "  + operand2 + " ="
            result = operand1 * operand2
            operand1 = result
            break
        case "sub":
            topDisplay.innerText = operand1 +  " - "  + operand2 + " ="
            result = operand1 - operand2
            operand1 = result
            break
        case "add":
            topDisplay.innerText = operand1 + " + "  + operand2 + " ="
            result = operand1 + operand2
            operand1 = result
            break
        }
}

function decimal(e) {
    if (!bottomDisplay.innerText.includes(".")) {
        appendBottomDisplay(e.target.innerText)
    }
}
function equals(e) {
    operatorButton(e.target.innerText,"equals")
}

function add(e) {
    console.log("add")
    operatorButton(e.target.innerText,"add")
}
function subtract(e) {
    console.log("sub")
    operatorButton(e.target.innerText,"sub")
}
function multiply(e) {
    console.log("mul")
    operatorButton(e.target.innerText,"mul")
}

//Utils
console.log("EOF")