// Core Dependencies
const express = require('express');
const cors = require('cors');
const InitiateMongoServer = require('./src/db/db');
const path = require('path');

// Custom Dependencies
InitiateMongoServer();

// Routers
const baseRouter = require('./src/router');
const fileRouter = require('./src/router/file.router');

// App Init
const app = express();
app.use(express.static('public'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: '*' }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Router Middleware
app.use('/', baseRouter);
app.use('/api/v1/file', fileRouter);

module.exports = app;
