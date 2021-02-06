$(document).ready(onReady);

function onReady() {
  $(document).on('submit', '#submit-button', onSubmit);
}

function onSubmit() {
  event.preventDefault();
  let newCalculation = {
    firstNumber: $('#first-number').val(),
    secondNumber: $('#second-number').val(),
  };

  $.ajax({
    url: '/calculator',
    method: 'POST',
    data: { calculation_to_add: newCalculation },
  })
    .then(function (response) {
      console.log('in POST response', response);
      // function to execute
    })
    .catch(function (error) {
      console.log('error', error);
    });
}
