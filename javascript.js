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
    if(bParam(b) != true) {
        if(a === 0)
            return msgDivideByZero();
        return a / a;
    }
        
    if(b === 0) {
        return msgDivideByZero();
    }

    return a / b;
}

function msgDivideByZero() {
    alert("ERROR: Can't Divide By 0!!! >:(");
    return null;
}

//If "b" for the operators isn't provided, return false.
function bParam(b) {
    if(b === "")
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
            return add(a, b);
        
        case "-":
            return sub(a, b);

        case "x":
            return mult(a, b);

        case "÷":
            return div(a, b);

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

function resetMainVals() {
    populateDisplay(currentNum = "0");
    decimalUsed = false;
    userNum1 = "";
    userNum2 = "";
    userOperation = "";
    calculated = false;
}

let userNum1 = "", userNum2 = "", userOperation = "";
let currentNum = "";
let operatorChosen = false, decimalUsed = false, powOn = false, calculated = false;


const numButtons = document.querySelectorAll('[id^="btnNum_"]');
numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(calculated)
            resetMainVals();
        if(currentNum[0] === "0" && currentNum[1] != ".") {
            currentNum = button.textContent;
        } else {
            currentNum += button.textContent;
        }
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
    if(powOn != true) 
        powOn = true;

    resetMainVals();       
});

const opButtons = document.querySelectorAll('[id^="btnOp_"]');
opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(userOperation === "") {
            userNum1 = Number(currentNum);
            
        } else if(calculated) {
            currentNum = String(userNum1);
            calculated = false;
            userNum2 = "";
        } else if(userNum1 != "" && userNum2 != ""){
            userNum2 = Number(currentNum);
            currentNum = userNum1 = operate(userOperation, userNum1, userNum2);
            
        }

        userOperation = button.textContent;
        if(userNum2 == "")
            userNum2 = Number(currentNum);
            
        populateDisplay(currentNum);
        currentNum = "";
    });
});

const calcButton = document.querySelector('#btnCalc');
calcButton.addEventListener('click', () => {
    if(userOperation === "") {
        populateDisplay(currentNum);
    } else {
        if(currentNum != "")
            userNum2 = Number(currentNum);

        currentNum = userNum1 = operate(userOperation, userNum1, userNum2);
    
        if(currentNum === null) {
            resetMainVals();
            populateDisplay(">:(");
        } else {
            populateDisplay(currentNum);
            calculated = true;
            currentNum = "";
        } 
    }

});