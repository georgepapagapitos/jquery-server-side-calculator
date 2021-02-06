const express = require('express');
const bodyParser = require('body-parser');
const calculator = require('./modules/calculator');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/calculator', function (req, res) {
  console.log('in GET request');
  res.send(calculator.calculationHistory);
});

app.post('/calculator', function (req, res) {
  let newCalculation = req.body.calculation_to_solve;
  console.log('req.body.calculation_to_solve', newCalculation);
  calculator.calculate(newCalculation);
  console.log('solution', newCalculation);
  res.sendStatus(200);
});

app.listen(PORT, function () {
  console.log('Server running on port 5000');
});
