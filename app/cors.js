const cors = require('cors');

// Only selected domain will have access to full the methods
exports.corsPrivate = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    const whitelist = isDevelopment ? ['http://localhost:3000'] : ["https://meusic-web-app.herokuapp.com"];

    return cors({
        origin: whitelist,
        methods: ['GET','POST','DELETE','PUT','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
    });
};

// Public use
exports.corsPublic = () => {
    return cors({
        origin: "*",
        methods: ['GET'],
    });
};