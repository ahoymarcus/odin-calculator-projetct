let currentVal = 0;
let currentOperator = '';
const operatorsRegex = /[/x\-+]/;
const operationRegex = /[0-9][/x\-+][0-9]/;

/* REGEX */
console.log(operationRegex.test('4/6'));
console.log(operationRegex.test('4x6'));
console.log(operationRegex.test('4-6'));
console.log(operationRegex.test('4+6'));


let operationArr = [];

const clearKey = document.getElementById('clear-key');
const calcDisplay = document.getElementById('calc-display');
const numKeys = document.querySelectorAll('.keyboard__num-keys');
const basicOperations = document.querySelectorAll('.keyboard__oper-keys');


/* CLEAR KEY */
clearKey.addEventListener('click', () => {
    currentVal = 0;
    calcDisplay.textContent = currentVal;
    operationArr = [];
    
    console.log(`CURRENT-VALUE: ${currentVal} ()${typeof currentVal}) :::\n OPERATION-ARRAY: ${operationArr.length === 0 ? 'EMPTY' : operationArr} (array-length -> ${operationArr.length})`);
});


/* BASIC OPERATIONS KEYS */
basicOperations.forEach(oper => {
    oper.addEventListener('click', (e) => {
        if (operationArr.length === 0) {
            return;
        } else if (operationRegex.test(operationArr.join(''))) {
            console.log('Math operation call test');
        } else if (operatorsRegex.test(operationArr)) {
            return;
        }
        
        currentOperator = e.target.textContent;
        operationArr.push(currentOperator);
        console.log(`CURRENT-OPERATION: ${currentOperator}`);
        
        calcDisplay.textContent = operationArr.join('');
    });
});

/* DISPLAY */
calcDisplay.textContent = currentVal;


/* KEYBOARD */
numKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        if (operationArr.length === 0 &&  parseInt(e.target.textContent) === 0) {
            console.log('Input teste1');
            currentVal = '0';
            operationArr.push(currentVal, '.');
            
            calcDisplay.textContent = operationArr.join('');
        } else if (operationArr.length === 0 && e.target.textContent === '.') {
            console.log('Input teste2');
            currentVal = e.target.textContent;
            operationArr.push(0, currentVal);
            
            calcDisplay.textContent = operationArr.join('');
        } else if (operationArr.length === 0 && e.target.textContent === '%') {
            console.log('Input teste3');
            
            calcDisplay.textContent = 'Malformed Expression!';
        } else if (operationArr.length === 0) {
            currentVal = e.target.textContent;
            operationArr.push(currentVal);
        
            calcDisplay.textContent = currentVal;
        } else {
            if (operationArr.indexOf('.') !== -1 && e.target.textContent === '.') {
                return;
            } else {
                currentVal = e.target.textContent;
                operationArr.push(currentVal);
                
                calcDisplay.textContent = operationArr.join('');
            } 
        }
            
        console.log(`CURRENT-VALUE: ${currentVal} ::: OPERATION-ARRAY: ${operationArr}`);
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



