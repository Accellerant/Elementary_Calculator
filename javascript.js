/*

=== Function Ordering ===
1. If it works in the background it'll be first.
2. If it's involved with the doc or keyboard triggering,
    it'll be ordered in terms of how it pops up on the 
    Web Doc: From Container to Container, Left to Right. 

=== General Doc Ordering ===
1. Like for #2 in Function Ordering, the DOM/listener content
    is ordered based on how items are ordered on the
    web page: from container to container, left to right.

2. The Keyboard listener is at the very end of this file.

*/
function add (a, b) {
    return a + b;
}

function sub (a, b) {
    return a - b;
}

function mult (a, b) {
    return a * b;
}

function div (a, b) {   
    if(b === 0) {
        return msgDivideByZero();
    }

    return a / b;
}

function msgDivideByZero() {
    alert("ERROR: Can't Divide By 0!!! >:(");
    return null;
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



/*
Find the Decimal in a string. If found, seperate the
whole numbers from the decimal numbers. From there, 
Take the decimal number and round
it down to the last two digits. If the last two digits
are both zero, set the decimal number to zero.

Finally, add the decimal number and the whole number back
together and return it.
*/
function roundDecimal(a) {
    let wholeNum = null, decNum = null, decPos = null;

    if(typeof(a) !== "string") 
        a = String(a);

    decPos = a.indexOf(".");

    if(decPos != -1) {
        wholeNum = a.slice(0, decPos);
        decNum = a.slice(decPos);

        decNum = String(Number(decNum).toFixed(2));
        decPos = decNum.indexOf(".")

        if(decPos != -1) {
            if(decNum[decPos + 1] == "0" && decNum[decPos +2] == "0")
                decNum = "0";
        }
        // Add the Numbers back together.
        a = Number(wholeNum) + Number(decNum);
    }
    return Number(a);
}



function populateDisplay(stringDisplay){
    if(powOn) {
        const display = document.querySelector("#numDisplay");
        display.textContent = stringDisplay;
    } 
}



function resetMainVals() {
    populateDisplay(currentNum = "0");
    mainNum = "";
    pastNum = "";
    operator = "";
    calculated = false;
}



/*
Calculated the current nums/operators.
*/
function calculation() {
    currentNum = mainNum = 
    roundDecimal(operate(operator, mainNum, pastNum));
}



/*
When hitting operator keys on the keyboard, 
it will return the appropriate
operator to be used for the operate() function. 
*/
function keyOpConversion(operator) {
    if(operator === "+" || operator === "-") {
        return operator;
    } else 
        return (operator === "/" ? "÷" : "x");

}



/*
Has all the numbered buttons relay their values to currentNum.

Can be triggered via the keyboard - if the mouse is used, the
keyVal will be an object and will change the keyVal value.
Otherwise, the keyVal will acquire it's value from the keyboard.
*/
function numBtn(keyVal = "undefined") {
    typeof keyVal === "object" ? keyVal = this.textContent : keyVal;

    if(calculated)
            resetMainVals();

    // When currentNum is "0" and doesn't have a decimal
    if(currentNum[0] === "0" && currentNum.indexOf(".") === -1) {
        currentNum = keyVal;

    } else {
        currentNum += keyVal;
    }

    populateDisplay(currentNum);
}



/*
Keeps the display blank until this function
is called. 
*/
function powOnClear(){
    if(!powOn)
        powOn = true;

    resetMainVals();
}



/*
Figures out if the decimal will be at the very beginning
or in the middle of the number. This will also self-check
if there's a currently existing decimal already.
*/
function decBtn() {
    if(currentNum.length === 0)
        currentNum = "0.";
    else if (currentNum.indexOf(".") === -1)
        currentNum += ".";

    populateDisplay(currentNum);
}



/*
Remove the last digit in currentNum until there's only 
one digit left. If there's only one digit remaining
when this is called, replace it with a zero.
*/
function backSpace() {
    let numLen = currentNum.length;

    if(numLen > 1) 
        currentNum = currentNum.slice(0, numLen - 1);
    else
        currentNum = "0";

    populateDisplay(currentNum);
}



/*
Assign an operator to the operator value.

This function will also allow "rolling" calculations, where
when there's two chosen numbers and then an operator follows it
then the previous two numbers shall be calculated before the third
number is acquired.
*/
function operationBtn() {
    if(operator === "") {
        mainNum = Number(currentNum);
        
    //Carry the calculated number to currentNum and clear 
    } else if(calculated) {
        currentNum = String(mainNum);
        calculated = false;

    //Allows "roling" calculations.
    } else if(mainNum !== "" && pastNum !== "" && currentNum !== ""){
        pastNum = Number(currentNum);
        calculation();   
    }

    //Lets ya do "1+=" which allows one to do a calculation with one number.
    if(pastNum == "")
        pastNum = Number(currentNum);
    
    //Prevents empty strings from being displayed.
    if(currentNum != "")
        populateDisplay(currentNum);

    /* If this is called via a button, operator will acquire
    a valid String. Otherwise, if it's called via the keyboard,
    it'll receieve "undefined". Thus, operator is assigned
    after this function is called via keyboard input. */
    operator = this.textContent;
    //Reset for the next number
    currentNum = ""; 
}



/*
Call this function when the enter key or "=" button
is pressed. So long as there's an operator chosen,
proceed to calculate the equation.
*/
function calculateBtn() {
    if(operator === "") {
        populateDisplay(currentNum);
    } else {
        //Allows calculating with only 1 digit and operator.
        if(currentNum != "")
            pastNum = Number(currentNum);

        calculation()
    
        //If the user attempts to divide by zero, this fires off.
        if(currentNum === null) {
            resetMainVals();
            populateDisplay(">:(");
        } else {
            populateDisplay(currentNum);
            calculated = true;
            currentNum = "";
        } 
    }
}



/* Main Program Vals */
/* 
mainNum: first number, as well as the ending calculation.
pastNum: temporary number which will hold the newly entered numbers.
currentNum: medium to pass numbers between variables and 
    show what's displayed.

calculated: flags if the equals button has been hit.

*/
let mainNum = "", pastNum = "", operator = "";
let currentNum = "";
let powOn = false, calculated = false;



const numButtons = document.querySelectorAll('[id^="btnNum_"]');
numButtons.forEach((button) => {
    button.addEventListener('click', numBtn)
});

const clearButton = document.querySelector('#btn_on');
clearButton.addEventListener('click', powOnClear);

const decButton = document.querySelector('#btnDec');
decButton.addEventListener('click', decBtn);

const backButton = document.querySelector('#btnBack');
backButton.addEventListener('click', backSpace);

const opButtons = document.querySelectorAll('[id^="btnOp_"]');
opButtons.forEach((button) => {
    button.addEventListener('click', operationBtn,);
});

const calcButton = document.querySelector('#btnCalc');
calcButton.addEventListener('click', calculateBtn, false);


/*
Accepts the listed keyboard commands for the switch
and will call the associated function(s).
*/
window.addEventListener('keydown', (event) => {
    document.activeElement.blur();

    switch(event.key) {
        case "Enter":
            calculateBtn();
            break;

        case "+":
        case "-":
        case "/":
        case "*":
            operationBtn();
            //Needed since the key will not be accessible
            operator = keyOpConversion(event.key);
            break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            numBtn(event.key);
            break;

        case ".":
            decBtn();
            break;

        case "NumLock":
            powOnClear();
            break;
        
        case "Backspace":
            backSpace();
            break;
        
    }
});