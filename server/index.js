'use strict';

const path = require('path');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const debug = require('debug');
const uuid = require('uuid');

const logger = debug('mylogger');
logger('Starting app');
const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());


const users = {
    'Victoria': {
        username: 'Victoria',
        password: '12345',
        score: 30
    },
    'Yuryyyy': {
        username: 'Yuryyyy',
        password: '12345',
        score: 29
    },
    'Marina': {
        username: 'Marina',
        password: '12345',
        score: 72
    },
    'Ruben666': {
        username: 'Ruben666',
        password: '12345',
        score: 33
    },
    'ndr': {
        username: 'ndr',
        password: '12345',
        score: 100
    }
};
const ids = {};

app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if (!username || !password || !passwordConfirm ||
        password.match(/[^(\d\w)*]/) ||
        passwordConfirm.match(/[^(\d\w)*]/) ||
        password !== passwordConfirm) {

        return res.status(400).json({error: 'Invalid user data'});
    }

    if (users[username]) {
        return res.status(400).json({error: 'A user with that username already exists'});
    }

    const id = uuid();
    const user = {username, password, score: 0};

    ids[id] = username;
    users[username] = user;

    res.cookie('Accord', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json({id});
});

app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!password || !username) {
        return res.status(400).json({error: 'Username or password is not specified'});
    }

    if (!users[username] || users[username].password !== password) {
        return res.status(400).json({error: 'Invalid username or password'});
    }

    const id = uuid();
    ids[id] = username;

    res.cookie('Accord', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).json({id});
});

app.get('/me', function (req, res) {
    const id = req.cookies['Accord'];
    const username = ids[id];
    if (!username || !users[username]) {
        return res.status(400).end();
    }

    users[username].score += 1;

    res.json(users[username]);
});


const port = process.env.PORT || 3000;

app.listen(port, function () {
    logger(`Server listening port ${port}`);
});
