function add (a, b) {
    if(bParam(b) != true)
        return a + a;

    return a + b;
}

function sub (a, b) {
    if(bParam(b) != true)
        return a - a;

    return a - b;
}

function mult (a, b) {
    if(bParam(b) != true)
        return a * a;

    return a * b;
}

function div (a, b) {
    if(bParam(b) != true)
        return a / a;

    return a / b;
}

//If "b" for the operators isn't provided, return false.
function bParam(b) {
    if(typeof(b) === "undefined")
        return false;
    
    return true;
}

/*
Take in a string for operator, and pass the variables "a" and "b"
to their appropriate function.
*/
function operate (operator, a, b) {
    switch (operator) {
        case "+":
            add(a, b);
            break;
        
        case "-":
            sub(a, b);
            break;

        case "x":
            mult(a, b);
            break;

        case "÷":
            div(a, b);
            break;

        default:
            console.log("ERROR: No provided Operator!!!!");
    }
}

function populateDisplay(stringDisplay){
    if(powOn == true) {
        const display = document.querySelector("#numDisplay");
        display.textContent = stringDisplay;
    } 
}

let userNum1 = "", userNum2 = "", userOperation = "";
let currentNum = "";
let operatorChosen = false, decimalUsed = false, powOn = false;


const numButtons = document.querySelectorAll('[id^="btnNum_"]');
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentNum += button.textContent;
        populateDisplay(currentNum);
    })
})

const decButton = document.querySelector('#btnDec');
decButton.addEventListener('click', () => {
    if(decimalUsed != true){
       currentNum += ".";
       populateDisplay(currentNum);
       decimalUsed = true;
    }
});

const clearButton = document.querySelector('#btn_on');
clearButton.addEventListener('click', () => {
    if(powOn != true) {
        powOn = true;
        populateDisplay("0");
    } else {
        populateDisplay("0");
        currentNum = "";
    }
        
})