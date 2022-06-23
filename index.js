/* REGEX */
const operatorsRegex = /[/x\-+]/;
const operationRegex = /[0-9][/x\-+][0-9]/;
console.log(operationRegex.test('4/6'));
console.log(operationRegex.test('4x6'));
console.log(operationRegex.test('4-6'));
console.log(operationRegex.test('4+6'));

let pointRegex = /[0-9]+\.[0-9]*/;

/* regex testing */
let testPoint = '.';
let testArr = [1, 2, '.'];
if (/[0-9]+\./.test(testArr.join('')) && testPoint === '.') {
    console.log('Regex testing: true');
} else {
    console.log('Regex testing: false');
}


/* VARIABLES */
let currentVal = 0;
let currentOperator = '';
let firstOperand = 0;
let secondOperand = 0;
let operationArr = [];

const calcDisplay = document.getElementById('calc-display');
const msgDisplay = document.getElementById('msg-display');
const clearKey = document.getElementById('clear-key');
const returnKey = document.getElementById('carriage-ret');
const equalKey = document.getElementById('equal-sign');
const numKeys = document.querySelectorAll('.keyboard__num-keys');
const basicOperations = document.querySelectorAll('.keyboard__oper-keys');
const power2 = document.getElementById('power2');
const rad2 = document.getElementById('rad2');



/* DISPLAY */
calcDisplay.textContent = currentVal;


/* CLEAR KEY */
clearKey.addEventListener('click', () => {
    currentVal = 0;
    currentOperator = '';
    firstOperand = 0;
    secondOperand = 0;
    operationArr = [];
    printMsg('');
    calcDisplay.textContent = currentVal;
    
    console.log(`CURRENT-VALUE: ${currentVal} ()${typeof currentVal}) :::\n OPERATION-ARRAY: ${operationArr.length === 0 ? 'EMPTY' : operationArr} (array-length -> ${operationArr.length})`);
});

/* CARRIAGE RETURN */
returnKey.addEventListener('click', () => {
    operationArr.pop();
    currentVal = operationArr[operationArr.length - 1];
    calcDisplay.textContent = operationArr.join('');
    
    console.log(`CURRENT-VALUE: ${currentVal} (${typeof currentVal}) :::\n OPERATION-ARRAY: ${operationArr.length === 0 ? 'EMPTY' : operationArr} (array-length -> ${operationArr.length})`);
});

/* THE EQUALSIGN */
equalKey.addEventListener('click', () => {
    if (operationRegex.test(operationArr.join(''))) {
        console.log('EQUALSIGN math operation call test');
        let operationStr = operationArr.join('');
        
        secondOperand = operationStr.slice(operationStr.search(operatorsRegex) + 1);
        
        console.log(`LEFT-HAND-SIDE: ${firstOperand} :::\n RIGHT-HAND-SIDE: ${secondOperand} :::\n CURRENT-OPERATOR: ${currentOperator}`);
        
        let result = operate(currentOperator, Number(firstOperand), Number(secondOperand));
        
        currentVal = result;
        operationArr = [result];
        
        printMsg(`${firstOperand}${currentOperator}${secondOperand}`);
        
        calcDisplay.textContent = result;
    }
});


/* BASIC OPERATIONS KEYS */
basicOperations.forEach(oper => {
    oper.addEventListener('click', (e) => {
        if (operationArr.length === 0) {
            return;
        } else if (operationArr[operationArr.length - 1] === '.') {
            currentVal = 0;
            currentOperator = e.target.textContent;
            operationArr.push(0, currentOperator);
            
            let operationStr = operationArr.join('');
            firstOperand = operationStr.slice(0, operationStr.search(operatorsRegex));
        } else if (operationRegex.test(operationArr.join(''))) {
            console.log('BASIC-OPERATOR math operation call test');
            let operationStr = operationArr.join('');
            
            secondOperand = operationStr.slice(operationStr.search(operatorsRegex) + 1);
            
            console.log(`LEFT-HAND-SIDE: ${firstOperand} :::\n RIGHT-HAND-SIDE: ${secondOperand} :::\n CURRENT-OPERATOR: ${currentOperator}`);
        
            let result = operate(currentOperator, Number(firstOperand), Number(secondOperand));
            
            currentOperator = e.target.textContent;
            currentVal = result;
            operationArr = [result, currentOperator];
            
            printMsg(`${firstOperand}${currentOperator}${secondOperand}`);
            
            calcDisplay.textContent = result;
        } else if (operatorsRegex.test(operationArr)) {
            return;
        } else {
            currentOperator = e.target.textContent;
            operationArr.push(currentOperator);
            
            let operationStr = operationArr.join('');
            firstOperand = operationStr.slice(0, operationStr.search(operatorsRegex));
        }
        console.log(`CURRENT-OPERATION: ${currentOperator}`);
        
        calcDisplay.textContent = operationArr.join('');
    });
});


/* OHTER OPERATIONS KEYS **/
power2.addEventListener('click', () => {
    if (
        /[0-9]+\.?[0-9]*/.test(operationArr)
        && !operatorsRegex.test(operationArr)
    ) {
        currentOperator = '**';
        console.log(`CURRENT-OPERATION: ${currentOperator}`);
        
        let operationStr = operationArr.join('');
        firstOperand = operationStr.slice(0);
        
        let result = operate(currentOperator, Number(firstOperand));
        
        currentVal = result;
        operationArr = [result];
        console.log(`CURRENT-VALUE: ${currentVal} ::: OPERATION-ARRAY: ${operationArr}`);
        
        printMsg(`${firstOperand}${currentOperator}`);
        calcDisplay.textContent = result;
    } else {
        printTimedMsg('Invalid operation!', 3000);
    }
});

rad2.addEventListener('click', () => {
    if (
        /[0-9]+\.?[0-9]*/.test(operationArr)
        && !operatorsRegex.test(operationArr)
    ) {
        currentOperator = '&#8730';
        console.log(`CURRENT-OPERATION: ${currentOperator}`);
        
        let operationStr = operationArr.join('');
        firstOperand = operationStr.slice(0);
        
        let result = operate(currentOperator, Number(firstOperand));
        
        currentVal = result;
        operationArr = [result];
        console.log(`CURRENT-VALUE: ${currentVal} ::: OPERATION-ARRAY: ${operationArr}`);
        
        //printMsg(`${firstOperand}${currentOperator}`);
        printMsg(`${firstOperand}->radiciation`);
        calcDisplay.textContent = result;
    } else {
        printTimedMsg('Invalid operation!', 3000);
    }
});



/* NUMERIC KEYS */
/*
 * Validation not completed yet: it's only possible to have decimal point in only
 * one side of a math operation: so, you have either 12,4 + 45 OR 124 + 4,5.
 */
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
            
            printTimedMsg('Invalid operation!', 3000);
            
            return;
        } else if (operationArr.length === 0) {
            currentVal = e.target.textContent;
            operationArr.push(currentVal);
        
            calcDisplay.textContent = currentVal;
        } else {
            if (operationArr[operationArr.length - 1] === '.' && e.target.textContent === '%') {
                currentOperator = e.target.textContent;
                currentVal = 0;
                operationArr.push(0);
                console.log(`Current-operator: ${currentOperator} - test1`);
                let operationStr = operationArr.join('');
                firstOperand = operationStr.slice(0);
                
                let result = operate(currentOperator, Number(firstOperand));
                    
                currentVal = result;
                operationArr = [result];
                
                //printMsg(`${firstOperand} ->&#8730;`);
                printMsg(`${firstOperand} ->percent`);
                calcDisplay.textContent = result;
            } else if (operatorsRegex.test(operationArr) && e.target.textContent === '%') {
                printTimedMsg('Invalid operation!', 3000);
                
                return;
            } else if (
                operatorsRegex.test(operationArr[operationArr.length - 1]) && e.target.textContent === '.'
            ) {
                currentVal = e.target.textContent;
                operationArr.push(0, currentVal);
                
                calcDisplay.textContent = operationArr.join('');
            } else if (
                operatorsRegex.test(operationArr[operationArr.length - 1]) && parseInt(e.target.textContent) === 0
            ) {
                currentVal = e.target.textContent;
                operationArr.push(currentVal, '.');
                
                calcDisplay.textContent = operationArr.join('');
            } else if (
                /[0-9]+\.[0-9]*/.test(operationArr.join('')) && e.target.textContent === '.'
            ) {
                return;
            } else {
                if (e.target.textContent === '%') {
                    currentOperator = e.target.textContent;
                    console.log(`Current-operator: ${currentOperator} - test2`);
                    let operationStr = operationArr.join('');
                    firstOperand = operationStr.slice(0);
                    
                    let result = operate(currentOperator, Number(firstOperand));
                    
                    currentVal = result;
                    operationArr = [result];
                    
                    //printMsg(`${firstOperand} ->&#8730;`);
                    printMsg(`${firstOperand} ->percent`);
                    calcDisplay.textContent = result;
                } else {
                    currentVal = e.target.textContent;
                    operationArr.push(currentVal);
                
                    calcDisplay.textContent = operationArr.join('');
                }
                
            } 
        }
            
        console.log(`CURRENT-VALUE: ${currentVal} ::: OPERATION-ARRAY: ${operationArr}`);
    });
});



/* CALCULATOR MESSAGES */
const printMsg = (msg) => msgDisplay.textContent = msg;

const printTimedMsg = (msg, timer) => {
    msgDisplay.textContent = msg;
        
    setTimeout(() => {
        msgDisplay.textContent = '';
    }, timer);
};



/* MATH OPERATIONS */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => {
	let result = a.toFixed(2) * b.toFixed(2);
	
	return result.toFixed(2);
};
const divide = (a, b) => {
	if (b > 0) {
        let result = a.toFixed(2) / b.toFixed(2);
	
        return result.toFixed(2);
    } else {
        return 'You got to be kidding! Invalid Operation!';
    }
};
const percent = (a) => a.toFixed(2) / 100;
const power = (a, b = 2) => a.toFixed(2) ** b;
const rad = (a, b = 0.5) => a.toFixed(2) ** b;


function operate(operator, num1, num2) {
	let result = 0;
	
	if (operator === '+') {
		result = add(num1, num2);
	} else if (operator === '-') {
		result = subtract(num1, num2);
	} else if (operator === 'x') {
		result = multiply(num1, num2);
	} else if (operator === '/') {
		result = divide(num1, num2);
	} else if (operator === '%') {
		result = percent(num1);
    } else if (operator === '**') {
		result = power(num1);
	} else if (operator === '&#8730') {
		result = rad(num1);
	} else {
		console.log('Operator not allowed');
	}
	
	console.log(`Operation result ---> ${result}`);
    
    return result;
}



