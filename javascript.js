function add (a, b) {
    if(!bParam(b))
        return a + a;

    return a + b;
}

function sub (a, b) {
    if(!bParam(b))
        return a - a;

    return a - b;
}

function mult (a, b) {
    if(!bParam(b))
        return a * a;

    return a * b;
}

function div (a, b) {
    if(!bParam(b))
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

        case "*":
            mult(a, b);
            break;

        case "/":
            div(a, b);
            break;

        default:
            console.log("ERROR: No provided Operator!!!!");
    }
}