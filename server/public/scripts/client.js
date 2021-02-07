$(document).ready(onReady);

let operator = '';

function onReady() {
  renderMath();
  $(document).on('submit', '#calculator', onSubmit);
  $(document).on('click', '.operation', getOperation);
  $(document).on('click', '#clear-button', clearButton);
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
  let calculationToSolve = {
    firstNumber: firstNumber,
    operation: operator,
    secondNumber: secondNumber,
    solution: '',
  };
  // Send the calculation object to the server
  $.ajax({
    url: '/calculate',
    method: 'POST',
    data: calculationToSolve,
  })
    .then(function (response) {
      // Call renderMath() function
      renderMath();
    })
    .catch(function (error) {
      console.log('error', error);
    });
}

// Function that grabs data from the server and appends it to the DOM
function renderMath() {
  $.ajax({
    url: '/calculate',
    method: 'GET',
  }).then(function (calcHistory) {
    $('#history-list').empty();
    for (let i = 0; i < calcHistory.length; i++) {
      $('#history-list').append(
        `<li>${calcHistory[i].firstNumber} ${calcHistory[i].operation} ${calcHistory[i].secondNumber} = ${calcHistory[i].solution}</li>`
      );
    }
  });
}

// Function that clears inputs when the 'C' button is pressed
function clearButton() {
  $('#first-number').val('');
  $('#second-number').val('');
  operator = '';
  $('#solution').text('');
}

function displayMath(event) {
  console.log($(this).data());
}
