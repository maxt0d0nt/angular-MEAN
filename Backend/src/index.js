const express = require('express');
const app = express();

require('./database');

app.use(express.json());

var indexRouter = require('./routes/index');

app.use('/api', indexRouter);

app.listen(3000);
console.log('Server on port', 3000)