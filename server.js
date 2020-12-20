const express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/api', api);

const port = 4000
app.listen(port, () => {
  console.log(`Слушаем по адрессу http://localhost:${port}`)
})

