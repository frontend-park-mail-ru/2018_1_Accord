'use strict';

const path = require('path');
const express = require('express');
const body = require('body-parser');
const debug = require('debug');

const logger = debug('mylogger');
logger('Starting app');
const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(body.json());

const port = process.env.PORT || 8000;

app.listen(port, function () {
  logger(`Server listening port ${port}`);
});
