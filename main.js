output = document.getElementById("output")

const calculator = {
  displayValue : '0',
  firstOperand : null,
  operator: null,
  waitingForSecondOPerand: false
}

function inputDigit(digit) {
  const { displayValue } = calculator;

  calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}


function inputDecimal(dot)  {
  
  if (!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }
}


function updateValue(){
  
  output.value = calculator.displayValue
}
updateValue();


const keys = document.querySelectorAll('.first');

for(let i = 0; i < keys.length; i++){

  keys[i].addEventListener('click', (e) => {

    const { target } = e;
  
  
    if (!target.matches('button')){
      return;
    }
  
    if (target.classList.contains('operator')) {
      console.log('operator', target.value);
      return;
    }
  
    if (target.classList.contains('decimal')) {
      console.log('decimal', target.value);
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      console.log('all-clear', target.value);
      return;
    }

   inputDigit(target.value);
   updateValue();

  })
}



















// let output = document.getElementById("output");
// let enterNum = 0;
// let operator = 0;
// let finalNum;

// let outputVal = output.value;

// function display(num) {
//   if (output.placeholder === "0") {
//     output.placeholder = "";
//   }
//   output.placeholder += num;
//   output.value = output.placeholder;
//   enterNum = Number(output.value);
//   finalNum = enterNum;
// }

// function addition() {
//   display('+')
//   output.placeholder = "";
//   operator += enterNum;
//   output.value = operator;
//   // console.log(ouput.value)
// }

// function subtraction() {
//   operator += -enterNum;
//   output.value = operator;
// }
