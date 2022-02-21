require('dotenv').config({path: "./config.env" });

const express = require('express');

const app = express();

require('./security')(app);

require('./limiter')(app);

require('./parser')(app, express);

require('./routes')(app);

require('./heroku')(app, express);

require('./mongodb')();

require('./port')(app);