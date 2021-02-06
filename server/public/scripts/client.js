$(document).ready(onReady);

let operator = '';

function onReady() {
  getCalcHistory();
  $(document).on('submit', '#input-form', onSubmit);
  $(document).on('click', '.operation-button', getOperation);
}

function getOperation(event) {
  event.preventDefault();
  operator = $(this).data('operation');
  console.log('operator', operator);
  return operator;
}

function getCalculationToSolve() {
  let firstNumber = $('#first-number').val();
  let secondNumber = $('#second-number').val();

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

function getCalcHistory() {
  $.ajax({
    method: 'GET',
    url: '/calculator',
  })
    .then(function (response) {
      $('#historyList').empty();
      $('#solution').text(response[0].solution);
      for (let calculation of response) {
        $('#historyList').append(
          `<li>${calculation.firstNumber} ${calculation.operation} ${calculation.secondNumber} = ${calculation.solution}</li>`
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });
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
      // calculate solution
      // append solution
      getCalcHistory();
      $('#first-number').val('');
      $('#second-number').val('');
      operator = '';
    })
    .catch(function (error) {
      console.log('error', error);
    });
}
