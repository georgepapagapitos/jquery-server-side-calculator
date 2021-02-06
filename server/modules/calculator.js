let calculationHistory = [];

function calculate(calculationToSolve) {
  let solution = { solution: 0 };
  let num1 = calculationToSolve.firstNumber;
  let num2 = calculationToSolve.secondNumber;
  switch (calculationToSolve.operator) {
    case 'add':
      solution = num1 + num2;
      break;
    case 'subtract':
      solution = num1 - num2;
      break;
    case 'multiply':
      solution = num1 * num2;
      break;
    case 'divide':
      solution = num1 / num2;
      break;
    default:
      solution = 0;
  }
  return solution;
}

module.exports = { calculationHistory, calculate };
