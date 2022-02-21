const path = require('path');

module.exports = (app, express) => {
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname, '../frontend/build')));

        app.get('*', (req, res) => {
            res.sendFile('index.html', {root: path.join(__dirname, '../frontend', 'build')});
        });
    }
};