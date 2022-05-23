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

function divide (a, b) {
    if(!bParam(b))
        return a / a;

    return a / b;
}

//If the b parameter for the operators is not provided, return false.
function bParam(b) {
    if(typeof(b) === "undefined")
        return false;
    
    return true;
}