const cookieParser = require('cookie-parser');

module.exports = (app, express) => {
    app.use(express.json({ limit: '100kb' }));
    app.use(express.urlencoded({extended: true, limit: '100kb'}));
    app.use(cookieParser());
}