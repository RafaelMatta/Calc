const labelInput = document.getElementById("input");
const labelHistory = document.getElementById("history");
const btnNumbers = document.querySelectorAll(".btn--number");
const btnOperators = document.querySelectorAll(".btn--operator");
const btnC = document.querySelector(".btn--c");
const btnCe= document.querySelector(".btn--ce");
const btnBackspace = document.querySelector(".btn--backspace");
const btnEqual = document.querySelector(".calc__btn--equal");
const btnDot = document.querySelector(".calc__btn--dot");
const displayWidth = document.querySelector(".calc__display").clientWidth;
let resultFontSize = parseFloat(window.getComputedStyle(labelInput, null).getPropertyValue('font-size'));

let lastInput = '';
let lastOperator = '';
let lastNumber = 0;
let result = 0;
const sizeLimit = resultFontSize;

btnOperators.forEach(btn => {
    btn.addEventListener('click', () => {
        lastNumber = +labelInput.innerText;
        if (!isLastInputAnOperator()) {
            calcLastOperation(+labelInput.innerText);
            labelHistory.innerHTML += `${labelInput.innerText} ${btn.innerText} `;
        } else if (lastInput == '=') {
            labelHistory.innerHTML = `${labelInput.innerText} ${btn.innerText} `;
        } else {
            changeOperator(btn.innerText);
        }
        labelInput.innerText = result;
        lastOperator = btn.innerText;
        lastInput = btn.innerText;
        changeTextSize();
    });
})

btnNumbers.forEach( btn => {
    btn.addEventListener('click', () => {
        if (lastInput == '=') clearAll();

        if (labelInput.innerText === '0' || isLastInputAnOperator()){
            labelInput.innerText = btn.innerText;

        } else {
            labelInput.innerText += btn.innerText;
        }
        lastInput = btn.innerHTML;
        changeTextSize();
    })
})

btnEqual.addEventListener('click', () => {
    if (lastOperator == '') {
        labelHistory.innerHTML = `${labelInput.innerText} ${btnEqual.innerText}`
        result = +labelInput.innerText;
    } else if(!isLastInputAnOperator()) {
        labelHistory.innerHTML = `${lastNumber} ${lastOperator} ${labelInput.innerText} ${btnEqual.innerText}`
        lastNumber = +labelInput.innerText;
        calcLastOperation(+labelInput.innerText);
        labelInput.innerText = result;
    } else{
        labelHistory.innerHTML = `${result} ${lastOperator} ${lastNumber} ${btnEqual.innerText}`
        calcLastOperation(lastNumber);
        labelInput.innerText = result;
    }
    lastInput = btnEqual.innerText;
    changeTextSize();
})

btnDot.addEventListener('click', () => {
    if (labelInput.innerText.includes('.')) return;

    labelInput.innerText += '.';
})

btnC.addEventListener('click', () => {
    clearResult();
})

btnCe.addEventListener('click', () => {
    clearAll();
})

btnBackspace.addEventListener('click', () => {
    eraseLast();
    if (lastInput == "=") {
        labelHistory.innerHTML = '&nbsp;'
    }
    changeTextSize();
})

const eraseLast = function () {
    if (!isLastInputAnOperator()) {
        labelInput.innerText = labelInput.innerText.slice(0, -1);
        if (labelInput.innerText.length < 1) {
            labelInput.innerText = '0';
        }
    }
}

const isLastInputAnOperator = function () {
    return !isFinite(lastInput);
}


const changeTextSize = function () {
    resultFontSize = ((displayWidth * resultFontSize) / labelInput.clientWidth);
    
    if (resultFontSize > sizeLimit) 
        resultFontSize = sizeLimit;

    labelInput.style.fontSize = `${resultFontSize}px`;
}

const changeOperator = function (operator) {
    labelHistory.innerText = `${labelHistory.innerText.slice(0, -1) + operator} `;
}

const clearResult = function () {
    labelInput.innerHTML = '0';
    lastInput = '';
}

const clearAll = function () {
    clearResult();
    labelHistory.innerHTML = '&nbsp;';
    lastOperator = '';
    result = 0;
    lastNumber = 0;
}

const calcLastOperation = function (inputValue) {
    if (lastOperator == ''){ 
        result = +labelInput.innerText; 
    }
    else{
        selectOperation(lastOperator, inputValue);
    }
}

const selectOperation = function (operator, inputValue) {
    switch (operator) {
        case "/": 
            calculateDivision(inputValue);
            break;
        case "*": 
            calculateMultiply(inputValue);
            break;
        case "-": 
            calculateSubtraction(inputValue);
            break;
        case "+": 
            calculateSum(inputValue);
            break;
        default:
            return;
    }
}

const calculateDivision = function (inputValue) {
    result /= inputValue;
}

const calculateMultiply = function (inputValue) {
    result *= inputValue;
}

const calculateSubtraction = function (inputValue) {
    result -= inputValue;
}

const calculateSum = function (inputValue) {
    result += inputValue;
}
