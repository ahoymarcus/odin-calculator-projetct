

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



