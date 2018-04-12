'use strict';

const path = require('path');
const express = require('express');
const body = require('body-parser');
const debug = require('debug');

const logger = debug('mylogger');
logger('Starting app');
const app = express();


app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(body.json());
app.use('/login/', express.static('dist'));
app.use('/signup/', express.static('dist'));
app.use('/help/', express.static('dist'));
app.use('/game/', express.static('dist'));
//app.use('/profile/', express.static('src'));
app.use('/leaderboard/', express.static('dist'));

const port = process.env.PORT || 8000;

app.listen(port, function () {
  logger(`Server listening port ${port}`);
});
