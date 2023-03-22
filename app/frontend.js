const path = require('path');

module.exports = (app, express) => {
    const production = process.env.NODE_ENV === "production";

    if(!production) return;

    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    app.get('*', (req, res) => res.sendFile('index.html', {root: path.join(__dirname, '../../frontend', 'build')}));

}