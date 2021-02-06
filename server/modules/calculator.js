let calculationHistory = [];

function calculate(equationObject) {
  let num1 = Number(equationObject.firstNumber);
  let operation = equationObject.operation;
  let num2 = Number(equationObject.secondNumber);
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
      throw new Error('select an operation');
  }
  calculationHistory.unshift(equationObject);
  console.log('equation object', equationObject);
  console.log('calc history array', calculationHistory);
  return equationObject;
}

module.exports = { calculationHistory, calculate };
