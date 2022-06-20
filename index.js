

const add = (a, b) => {
    let result = a + b;
    
    return result;
};
const subtract = (a, b) => {
    let result = a - b;
    
    return result;
};
const multiply = (a, b) => {
    let result = a * b;
    
    return result;
};
const divide = (a, b) => {
    let result = a / b;
    
    return result;
};


function operate(operator, num1, num2) {
    let result = 0;
    
    if (operator === '+') {
        result = add(num1, num2);
    } else if (operator === '-') {
        result = subtract(num1, num2);
    } else if (operator === '*') {
        result = multiply(num1, num2);
    } else if (operator === '/') {
        result = divide(num1, num2);
    } else {
        console.log('Operator not allowed');
    }
    
    console.log(result);
}



