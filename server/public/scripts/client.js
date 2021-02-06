$(document).ready(onReady);

let operator = '';
let calculationToSolve = {};

function onReady() {
  renderMath();
  $(document).on('submit', '#input-form', onSubmit);
  $(document).on('click', '.operation-button', getOperation);
}
// Function that determines the type of operation based on the button clicked
function getOperation(event) {
  event.preventDefault();
  // Sets the operator to whichever button is last pressed
  operator = $(this).data('operation');
  console.log('operator', operator);
  return operator;
}

// Function that creates an calculation object
function onSubmit(event) {
  event.preventDefault();
  // Grab data from form inputs
  let firstNumber = $('#first-number').val();
  let secondNumber = $('#second-number').val();
  // If no number is inputted, default to zero
  if (firstNumber === '') {
    firstNumber = 0;
  }
  if (secondNumber === '') {
    secondNumber = 0;
  }
  // Create an object with the data from the input form
  calculationToSolve = {
    firstNumber: firstNumber,
    operation: operator,
    secondNumber: secondNumber,
    solution: '',
  };

  $.ajax({
    url: '/calculate',
    method: 'POST',
    data: calculationToSolve,
  })
    .then(function (response) {
      console.log('in POST response', response);
      renderMath();
    })
    .catch(function (error) {
      console.log('error', error);
    });
}

function renderMath() {
  $.ajax({
    url: '/calculate',
    method: 'GET',
  }).then(function (response) {
    $('#history-list').empty();
    for (let i = 0; i < response.length; i++) {
      $('#history-list').append(
        `<li>${response[i].firstNumber} ${response[i].operation} ${response[i].secondNumber} = ${response[i].solution}</li>`
      );
      $('#solution').text(response[0].solution);
    }
    $('#first-number').val('');
    $('#second-number').val('');
    operator = '';
  });
}
