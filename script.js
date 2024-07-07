let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let action = "+";
let waitForSquareRoot = false;

const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll(".button");
const miniScreen = document.querySelector('.mini-screen');

buttons.forEach((btn) => {
  btn.addEventListener("click", function() {
   clickedEffect(btn)
    
    const buttonText = this.textContent.trim();

    if (!isNaN(buttonText)) {
      if(screenDisplay.value === "0") screenDisplay.value = "";
      screenDisplay.value += buttonText
      screenDisplay.scrollLeft = screenDisplay.scrollWidth;
    } else {
      switch (buttonText) {
        case "÷":
        case "X":
        case "-":
        case "+":
        case "%":
          if (screenDisplay.value === '') {
            if (buttonText === '-' && screenDisplay.value.length === 0) {
              screenDisplay.value += '-';
            }
          } else {
            firstNumber = parseFloat(screenDisplay.value);
            action = buttonText;
            miniScreen.value += screenDisplay.value + action;
            screenDisplay.value = '';
          }
          break;
        case "=":
          if (screenDisplay.value === '') {
            screenDisplay.value = '';
          } else {
            if (waitForSquareRoot) {
              firstNumber = screenDisplay.value.replace(secondNumber + "√(", "");
              console.log(secondNumber)
              if (secondNumber) {
                result = Math.sqrt(firstNumber) * secondNumber
                screenDisplay.value = result
                miniScreen.value = `${secondNumber} x √(${firstNumber}) = ${result}`
              } else {
                result = Math.sqrt(firstNumber)
                miniScreen.value = `√(${firstNumber}) = ${result}`
                screenDisplay.value = ""
              }
            } else {
              secondNumber = parseFloat(screenDisplay.value);
              if (action === '÷' && secondNumber === 0) {
                screenDisplay.value = '∞'
                miniScreen.value = 'infinity'
              } else {
                result = calculate(firstNumber, secondNumber);
                screenDisplay.value = result;
                miniScreen.value = `${firstNumber} ${action} ${secondNumber} = ${result}`;
                firstNumber = 0;
              }
            }
          }
          break;

        case ".":
          if (!screenDisplay.value.includes('.')) {
            screenDisplay.value += '.';
          }
          break;
        case "C":
          screenDisplay.value = '';
          screenDisplay.placeholder = '0';
          miniScreen.value = '';
          firstNumber = 0;
          secondNumber = 0;
          action = null;
          waitForSquareRoot = false;
          break;
        case '√':
          waitForSquareRoot = true
          secondNumber = screenDisplay.value
          screenDisplay.value += '√('
          break;
      }
    }
  });
});


function calculate(num1, num2) {
  switch (action) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'X':
      return num1 * num2;
    case '÷':
      return num1 / num2
    case '%':
      return num1 * num2 / 100;
  }
}

function clickedEffect(btn) {
  btn.classList.add('click-effect');

    // Remove the 'click-effect' class after 1000ms (1 second)
    setTimeout(function() {
      btn.classList.remove('click-effect');
    }, 100);


  btn.addEventListener('focus', function() {
    btn.classList.add('click-effect');
  });
}