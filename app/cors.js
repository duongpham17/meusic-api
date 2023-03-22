const cors = require('cors');

const {production_frontend_url, development_frontend_url} = require('../environment')

const isDevelopment = process.env.NODE_ENV === "development";

const whitelist = isDevelopment ? [development_frontend_url] : [production_frontend_url];

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