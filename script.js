let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let action;
let waitForSquareRoot = false; // Flag to indicate if we are waiting for square root operation

const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
const miniScreen = document.querySelector('.mini-screen');

buttons.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    const buttonText = this.textContent.trim();

    // Append the clicked button's value to the screen display
    if (!isNaN(buttonText)) {
      if (waitForSquareRoot && screenDisplay.value !== '') {
          firstNumber = parseFloat(screenDisplay.value); 
          result = Math.sqrt(firstNumber); 
          screenDisplay.value = result;
          miniScreen.value += `${firstNumber})`;
          waitForSquareRoot = false; // Reset flag
      } else {
          screenDisplay.value += buttonText;
      }
      screenDisplay.scrollLeft = screenDisplay.scrollWidth;
    } else {
      switch(buttonText) {
        case "/":
        case "X":
        case "-":
        case "+":
        case "%":
          firstNumber = firstNumber > 0 ? calculate(firstNumber, parseFloat(screenDisplay.value)) : parseFloat(screenDisplay.value);
          action = buttonText;
          miniScreen.value += screenDisplay.value + action;
          screenDisplay.value = '';
          break;
        case "=":
          secondNumber = parseFloat(screenDisplay.value);
          result = calculate(firstNumber, secondNumber);
          screenDisplay.value = result;
          firstNumber = 0;
          miniScreen.value = '';
          break;
        case ".":
          // Append decimal point if not already present
          if (!screenDisplay.value.includes('.')) {
            screenDisplay.value += '.';
          } else{
            
          }
          break;
        case "C": 
          screenDisplay.value = '';
          screenDisplay.placeholder = '0';
          miniScreen.value = '';
          firstNumber = 0;
          secondNumber = 0;
          action = null;
          waitForSquareRoot = false; // Reset the flag
          break;
        case '√': 
          if (screenDisplay.value !== '') {
            // Calculate the square root
            screenDisplay.value = result; // Display the result
            miniScreen.value += `√()`;
          } else {
            waitForSquareRoot = true; // Set flag to wait for the next number
            miniScreen.value += `√(`; // Update mini screen to show waiting for square root
          }
          break;
      }
    }
  });
});


function calculate(num1, num2) {
  switch(action) { 
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'X':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 * num2 / 100;
    default:
      return num1; // In case action is not set, just return the first number
  }
}
