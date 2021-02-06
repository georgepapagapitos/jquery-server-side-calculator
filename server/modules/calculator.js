let calculationHistory = [];

function calculate(calculationToSolve) {
  let solution = 0;
  let num1 = Number(calculationToSolve.firstNumber);
  let num2 = Number(calculationToSolve.secondNumber);
  switch (calculationToSolve.operation) {
    case '+':
      solution = num1 + num2;
      break;
    case '-':
      solution = num1 - num2;
      break;
    case '*':
      solution = num1 * num2;
      break;
    case '/':
      solution = num1 / num2;
      break;
    default:
      throw new Error('select an operation');
  }
  calculationToSolve.solution = solution;
  calculationHistory.unshift(calculationToSolve);
  return solution;
}

module.exports = { calculationHistory, calculate };
