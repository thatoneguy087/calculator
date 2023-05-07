'use strict';
// Initialize displayValue
let displayValue = '0';

//Initialize pieces of an operation
let operand1;
let operand2;
let operator;

// Flag to reset displayValue
let isOperationComplete = false;

// Reference to the display
const display = document.querySelector('.display h1');

// Reference to the number buttons
const numberButtons = document.querySelectorAll('.buttons .numbers button');

// Reference to the number options
const numberOptions = document.querySelectorAll('.buttons .options button');

// Reference to the operation buttons
const operations = document.querySelectorAll('.buttons .operators button');

// refreshDisplay Function - 	set the display text content to the display value
function refreshDisplay() {
  if(displayValue === ''){
    displayValue = '0';
  }
  display.textContent = displayValue;
}

// FormatDisplayValue to valid number value
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

// Get the length of only the number in displayValue, not counting the sign
function getDisplayValueNumberLength() {
  if(displayValue.includes('-')){
    return displayValue.length -1;
  }
  return displayValue.length
}

// 	Clear out just the current entry
function clearDisplay() {
  displayValue = '0';
}

// 	Clear out everything, variables and all, refresh display
function clearAll() {
  clearDisplay();
  operand1 = null;
  operand2 = null;
  operator = null;
  isOperationComplete = false;
}

// 	backspace displayValue
function backspace() {
  if(getDisplayValueNumberLength() > 1) {
    displayValue = displayValue.substring(0, displayValue.length -1);
  }
}

// 	Change the sign
function changeDisplayValueSign() {
  displayValue = displayValue.startsWith('-') ? displayValue.substring(1, displayValue.length) : `-${displayValue}`;
}

// Basic operation functions add, subtract, multiply, divide
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1,num2) {
  return num1 - num2;
}
function multiply(num1,num2) {
  return num1 * num2;
}
function divide(num1,num2) {
  if(num2 === 0) {
    return 'Gottem';
  }
  return num1 / num2;
}

// Operate function - will take in two values, along with an operator, and return the result
function operate(num1, num2, op) {
  return op(num1, num2);
}


// Click event handler to update displayValue with the button id
// 	if isOperationComplete is true, set the displayValue to '0'
numberButtons.forEach(button => button.addEventListener('click', e => {
  if(getDisplayValueNumberLength() >= 9){
    return;
  }
  let addOn = e.target.getAttribute('id');
  switch(addOn){
    case '.':
      //Only 1 decimal can be present
      if(!displayValue.includes('.')){
        displayValue += addOn;
      }
      break;
    case '0':
      //Will only add zeros when appropriate
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

// Click event handler to the option buttons to modify/clear out displayValue
numberOptions.forEach(option => option.addEventListener('click', e => {
  switch(e.target.getAttribute('id')){
    case 'clear':
      clearAll();
      break;
    case  'clear-entry':
      clearDisplay();
      break;
    case 'backspace':
      backspace();
      break;
    case 'sign':
      changeDisplayValueSign();
      break;
    default:
      console.log('Something went HORRIBLY wrong.')
  }
  refreshDisplay();
}));


// Add click event handler to the operation buttons
// 	clicking the '=' button will store the displayValue in operand2. It will then attempt to evaluate with operand1 and the operator. If the other parts are missing, do nothing.
// 	clicking any other operation will store the displayValue in operand1 and the operand. If we already had a value in 
// 	operand1, then we already have an operand. We can use these pieces, along with the current displayValue to create a chain of operations. We then update the operand for future chain/evaluation.
// 	refresh the display
// 	set isOperationComplete to true
operations.forEach(button => button.addEventListener('click', e => {
  let operation = e.target.getAttribute('id');
  if(operation === 'evaluate') {
    console.log('evaluate');
  }else {
    console.log('other operation');
  }
}));