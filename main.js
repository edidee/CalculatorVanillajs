window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(registration => {
      console.log('SM Registration');
      console.log(registration);
    }).catch(error => {
      console.log('SM Registration Failed');
      console.log(error);
    });
  }
});


output = document.getElementById("output")

const calculator = {
  displayValue : '0',
  firstOperand : null,
  operator: null,
  waitingForSecondOperand: false
};

// display value
function inputDigit(digit) {
  const {  displayValue , waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}





// handle decimal
function inputDecimal(dot)  {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }
}


// handle operator
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {

    calculator.firstOperand = inputValue;

  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

// update display
function updateValue(){ 
  output.value = calculator.displayValue
}
updateValue();

// calculate
function calculate(firstOperand, secondOperand, operator) {

  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-'){
    return firstOperand - secondOperand;
  } else if(operator === '*'){
    return firstOperand * secondOperand;
  } else if (operator === '/'){
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

// Reset
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

// Handle key press
const keys = document.querySelectorAll('.first');

for(let i = 0; i < keys.length; i++){

  keys[i].addEventListener('click', (e) => {

    const { target } = e;
    
  
    if (!target.matches('button')){
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateValue();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateValue();
      return;
      
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateValue();
      return;
    }

   inputDigit(target.value);
   updateValue();

  })
}























