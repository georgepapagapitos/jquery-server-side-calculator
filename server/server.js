const express = require('express');
const bodyParser = require('body-parser');
const calculator = require('./modules/calculator');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/calculator', function (req, res) {
  res.send(calculator.calculate(newCalculation));
});

app.post('/calculator', function (req, res) {
  let newCalculation = req.body.calculation_to_solve;
  calculator.calculationHistory.push(newCalculation);
  res.sendStatus(200);
});

app.listen(PORT, function () {
  console.log('Server running on port 5000');
});
