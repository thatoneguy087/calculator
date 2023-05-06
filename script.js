'use strict';
// Create displayValue and set it to 0
let displayValue = '0';

// Create operand1
let operand1;

// Create operand2
let operand2;

// Create operator
let operator;

// Create isOperationComplete
let isOperationComplete = false;

// Get reference to the display
const display = document.querySelector('.display h1');

// Get reference to the number buttons
const numberButtons = document.querySelectorAll('.buttons .numbers button');

// Get reference to the number options
const numberOptions = document.querySelectorAll('.buttons .options button');

// Get reference to the operation buttons
const operations = document.querySelectorAll('.buttons .operators button');

// Create refreshDisplay Function
// 	set the display text content to the display value. That's is.
function refreshDisplay() {
  if(displayValue === ''){
    displayValue = '0';
  }
  display.textContent = displayValue;
}

function formatDisplayValue() {
  if(displayValue.includes('.')){
    return;
  }
  if(displayValue.startsWith('-0') && displayValue !== '-0'){
    displayValue = `-${displayValue.substring(2, displayValue.length)}`
  } else if(displayValue.startsWith('0')){
    displayValue = displayValue.substring(1, displayValue.length);
  }
}

//function to get the length of only the number in displayValue, not counting the sign.
function getDisplayValueNumberLength() {
  if(displayValue.includes('-')){
    return displayValue.length -1;
  }
  return displayValue.length
}
// Add click event handler to each of the number buttons
// 	if isOperationComplete is true, set the displayValue to '0'.
// 	each click will add the id of the selected button to the display value
// 	special case for '.' and '0'.
numberButtons.forEach(button => button.addEventListener('click', e => {
  if(getDisplayValueNumberLength() >= 9){
    return;
  }
  let addOn = e.target.getAttribute('id');
  switch(addOn){
    case '.':
      if(!displayValue.includes('.')){
        displayValue += addOn;
      }
      break;
    case '0':
      if(displayValue.includes('.') || (Number(displayValue) !== 0)) {
        displayValue += addOn;
      }
      break;
    default:
      displayValue += addOn;
  }
  formatDisplayValue();
  refreshDisplay();
}));
// Add click event handler to each of the number options
// 	each click will modify the displayValue
// 	'-' will change the sign
// 	'c' will clear out everything, variables and all, refresh display
// 	'ce' will clear out just the current entry
// 	'←' will backspace a number
function clearDisplay() {
  displayValue = '0';
}
function clearAll() {
  clearDisplay();
  operand1 = null;
  operand2 = null;
  operator = null;
  isOperationComplete = false;
}

function backspace() {
  if(getDisplayValueNumberLength() > 1) {
    displayValue = displayValue.substring(0, displayValue.length -1);
  }
}

numberOptions.forEach(option => option.addEventListener('click', e => {
  if(e.target.getAttribute('id') === 'clear'){
    clearAll();
  } else if(e.target.getAttribute('id') === 'clear-entry') {
    clearDisplay();
  } else if(e.target.getAttribute('id') === 'backspace'){
    backspace();
  } else if(e.target.getAttribute('id') === 'sign') {
    displayValue = displayValue.startsWith('-') ? displayValue.substring(1, displayValue.length) : `-${displayValue}`;
  }
  refreshDisplay();
}));
// Create basic operation function
// 	add, subtract, multiply, divide

// Create operate function
// 	will take in two values, along with an operator, and return the result

// Add click event handler to the operation buttons
// 	clicking the '=' button will store the displayValue in operand2. It will then attempt to evaluate with operand1 and the operator. If the other parts are missing, do nothing.
// 	clicking any other operation will store the displayValue in operand1 and the operand. If we already had a value in 
// 	operand1, then we already have an operand. We can use these pieces, along with the current displayValue to create a chain of operations. We then update the operand for future chain/evaluation.
// 	refresh the display
// 	set isOperationComplete to true