const path = require('path');

module.exports = (app, express) => {
    const production = process.env.NODE_ENV === "production";

    if (!production) return;

    const buildPath = path.join(__dirname, '../../frontend/build');

    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        const indexPath = path.join(buildPath, 'index.html');
        res.sendFile(indexPath);
    });
}