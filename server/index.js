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
app.use('/login/', express.static('src'));
app.use('/signup/', express.static('src'));
app.use('/help/', express.static('src'));
app.use('/game/', express.static('src'));
//app.use('/profile/', express.static('src'));
app.use('/leaderboard/', express.static('src'));

const port = process.env.PORT || 8000;

app.listen(port, function () {
  logger(`Server listening port ${port}`);
});
