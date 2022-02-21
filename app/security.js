const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');

module.exports = (app) => {
    app.use(mongoSanitize());
    app.use(xss());
}