require('dotenv').config({path: "./config.env" });

const express = require('express');
const app = express();
const http = require('http').Server(app);

require('./security')(app);

require('./limiter')(app);

require('./parser')(app, express);

require('./routes')(app);

require('./heroku')(app, express);

require('./socket')(http);

require('./mongodb')();

require('./port')(http);