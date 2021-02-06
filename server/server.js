const express = require('express');
const bodyParser = require('body-parser');
const calculator = require('./modules/calculator');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculate', function (req, res) {
  console.log('req.body', req.body);
  calculator.calculate(req.body);
  res.sendStatus(200);
});

app.get('/calculate', function (req, res) {
  console.log('in GET');
  res.send(calculator.calculationHistory);
});

app.listen(PORT, function () {
  console.log('Server running on port 5000');
});

// app.delete('/calculate', (req, res) => {
//   res.send('DELETE Request Called');
// });
