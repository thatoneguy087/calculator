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

// Reference to all buttons
const buttons = document.querySelectorAll('button');

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

function clearVariables() {
  operand1 = null;
  operand2 = null;
  operator = null;
}

// 	Clear out everything, variables and all, refresh display
function clearAll() {
  clearDisplay();
  clearVariables();
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
  return Number(num1) + Number(num2);
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
  let result = (op(num1, num2)).toString();
  if(result.length > 9){
    result = Number(result).toPrecision(4);
  }
  return result;
}

// Convert displayValue from string to number
function getDisplayValueNumber() {
  return Number(displayValue);
}

// Get the operation function
function getOperator(button) {
  switch(button.getAttribute('id')) {
    case '/':
      return divide;
    case '*':
      return multiply;
    case '-':
      return subtract;
    case '+':
      return add;
    default: 
      console.error('welp something went wrong.');
  }
}


// Function to update displayValue with the button id
function numberButtonClick(button){
  if(isOperationComplete) {
    displayValue = '0';
    isOperationComplete = false;
  }
  if(getDisplayValueNumberLength() >= 9){
    return;
  }
  let addOn = button.getAttribute('id');
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
}

// Function to modify/clear out displayValue
function numberOptionClick(button) {
  switch(button.getAttribute('id')){
    case 'x':
      clearAll();
      break;
    case  'c':
      clearDisplay();
      break;
    case 'Backspace':
      backspace();
      break;
    case 's':
      changeDisplayValueSign();
      break;
    default:
      console.log('Something went HORRIBLY wrong.')
  }
  refreshDisplay();
}

// Add Function for the operation buttons
// 	clicking the '=' button will store the displayValue in operand2. It will then attempt to evaluate with operand1 and the operator. If the other parts are missing, do nothing.
// 	clicking any other operation will store the displayValue in operand1 and the operand. If we already had a value in 
// 	operand1, then we already have an operand. We can use these pieces, along with the current displayValue to create a chain of operations. We then update the operand for future chain/evaluation.
// 	refresh the display
// 	set isOperationComplete to true
function operationClick(button) {
  if(button.getAttribute('id') === 'Enter') {
    if(!operand1){
      return;
    }
    operand2 = getDisplayValueNumber();
    displayValue = operate(operand1, operand2, operator).toString();
    clearVariables();
    refreshDisplay();
  }else {
    if(operand1) {
      //start chain if we already have our starting values
      operand1 = operate(operand1, getDisplayValueNumber(), operator);
      //string conversion to ensure displayValue will work with other methods
      displayValue = operand1.toString();
      operator = getOperator(button);
      refreshDisplay();
    } else {
      //get our initial values
      operand1 = getDisplayValueNumber();
      operator = getOperator(button);
    }
  }
  isOperationComplete = true;
}

// Merge all button functions into one event handler
buttons.forEach(button => button.addEventListener('click', () => {
  let buttonClass = button.getAttribute('class');
  switch(buttonClass) {
    case 'options':
      numberOptionClick(button);
      break;
    case 'numbers':
      numberButtonClick(button);
      break;
    case 'operators':
      operationClick(button);
      break;
    default:
      console.log('something went horribly wrong');
  }
}))

window.addEventListener('keydown', e => {
  console.log(e.key)
});