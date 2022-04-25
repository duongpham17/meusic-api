const cors = require('cors');

const isDevelopment = process.env.NODE_ENV === "development";

const whitelist = isDevelopment ? ['http://localhost:3000'] : [process.env.WEBSITE_URL];

// Only selected domain will have access to full the methods
const corsPrivate = () => {
    return cors({
        origin: whitelist,
        methods: ['GET','POST','DELETE','PUT','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
    });
};

// Public use
const corsPublic = () => {
    return cors({
        origin: "*",
        methods: ['GET'],
    });
};

module.exports = {
    corsPrivate,
    corsPublic,
    whitelist
}