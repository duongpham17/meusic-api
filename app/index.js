require('dotenv').config({path: "./config.env" });

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./security')(app);

require('./limiter')(app);

require('./parser')(app, express);

require('./routes')(app);

require('./heroku')(app, express);

require('./socket')(io);

require('./mongodb')();

require('./port')(http);