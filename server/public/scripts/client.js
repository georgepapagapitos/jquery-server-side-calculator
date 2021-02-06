$(document).ready(onReady);

let calculationToSolve = {};
let operator = '';

function onReady() {
  $(document).on('submit', '#input-form', onSubmit);
  $(document).on('click', '.operation-button', getOperation);
}

function onSubmit(event) {
  event.preventDefault();
  getCalculationToSolve();

  $.ajax({
    url: '/calculator',
    method: 'POST',
    data: { calculation_to_solve: calculationToSolve },
  })
    .then(function (response) {
      console.log('in POST response', response);
      // function to execute
    })
    .catch(function (error) {
      console.log('error', error);
    });
}

function getOperation(event) {
  event.preventDefault();
  operator = $(this).data('operation');
  if (operator === '') {
    console.log('Please select operation');
  } else {
    console.log('operator', operator);
    return operator;
  }
}

function getCalculationToSolve() {
  let firstNumber = Number($('#first-number').val());
  let secondNumber = Number($('#second-number').val());

  if (firstNumber === '') {
    firstNumber = 0;
  }
  if (secondNumber === '') {
    secondNumber = 0;
  }

  calculationToSolve = {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    operation: operator,
  };

  console.log('newCalculation', calculationToSolve);
  return calculationToSolve;
}
