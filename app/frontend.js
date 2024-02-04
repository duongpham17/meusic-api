const path = require('path');

module.exports = (app, express) => {
    const production = process.env.NODE_ENV === 'production';

    if (!production) {
        // In development, you might want to serve the frontend using webpack-dev-server or similar.
        // Handle development environment setup here.
        return;
    }

    const buildPath = path.join(__dirname, '../frontend/build');

    // Serve static files from the build directory
    app.use(express.static(buildPath));

    // Catch-all route to serve index.html
    app.get('*', (req, res) => {
        const indexPath = path.join(buildPath, 'index.html');
        res.sendFile(indexPath);
    });
};