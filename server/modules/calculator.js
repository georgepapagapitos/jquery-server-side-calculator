// Define an empty array that will hold all of the calculations
let calculationHistory = [];

// Function that performs a mathematical operation
function calculate(equationObject) {
  // Defines inputs based on given object (should be req.body)
  let num1 = equationObject.firstNumber;
  let operation = equationObject.operation;
  let num2 = equationObject.secondNumber;
  // Switch statement to determine operation based on user input
  switch (operation) {
    case '+':
      equationObject.solution = num1 + num2;
      break;
    case '-':
      equationObject.solution = num1 - num2;
      break;
    case '*':
      equationObject.solution = num1 * num2;
      break;
    case '/':
      equationObject.solution = num1 / num2;
      break;
    default:
      console.log('no operation selected');
  }
  calculationHistory.unshift(equationObject);
  console.log('calculation added to array:', equationObject);
  console.log('calculation history:', calculationHistory);
  return equationObject;
}

module.exports = { calculationHistory, calculate };
