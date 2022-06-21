let operationVal = 0;
let operationSign = '';

let operationArr = [];


const calcDisplay = document.getElementById('calc-display');
const numKeys = document.querySelectorAll('.keyboard__num-keys');



/* DISPLAY */
calcDisplay.textContent = operationVal;


/* KEYBOARD */
numKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        operationVal = e.target.textContent;
        operationArr.push(operationVal);
        console.log(`CURRENT-VALUE: ${operationVal} ::: OPERATION-ARRAY: ${operationArr}`);
        
        calcDisplay.textContent = operationVal;
    });
});





/* MATH OPERATIONS */
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
const power = (a, b = 2) => {
	let result = a ** b;
	
	return result;
};
const rad = (a, b = 0.5) => {
	let result = a ** b; 
	
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
	} else if (operator === '**') {
		result = power(num1);
	} else if (operator === '&#8730') {
		result = rad(num1);
	} else {
		console.log('Operator not allowed');
	}
	
	console.log(result);
}



