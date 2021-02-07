$(document).ready(onReady);

let calculationToSolve = {};

function onReady() {
  renderMath();
  $(document).on('click', '#submit-button', onSubmit);
  $(document).on('click', '.button', handleClick);
  $(document).on('click', '#clear-button', clearDisplay);
}

// Function that creates an calculation object
function onSubmit() {
  // Create an object with the data from the input form
  let equation = $('#display-field').text();
  let calculationToSolve = equation.split('');
  console.log(calculationToSolve);

  // Send the calculation object to the server
  $.ajax({
    url: '/calculate',
    method: 'POST',
    data: calculationToSolve,
  })
    .then(function (response) {
      renderMath(response);
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

function handleClick() {
  let buttonClicked = $(this).data('button');
  console.log(buttonClicked);
}

// Function that determines the type of operation based on the button clicked
// function getOperation() {
//   // Sets the operator to whichever button is last pressed
//   operator = $(this).data('operation');
//   console.log('operator', operator);
//   return operator;
// }

// Function that clears inputs when the 'C' button is pressed
function clearDisplay() {
  $('#display-field').text('0');
}
