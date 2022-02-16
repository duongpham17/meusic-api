const cors = require('cors');

module.exports = (app) => {

    const whitelist = ['http://localhost:3000', "https://meusic-web-app.herokuapp.com"];

    // Only selected domain will have access to full the methods
    app.use(cors({
        origin: whitelist,
        credentials: true,
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
        exposedHeaders: ["set-cookie"]
    }));
}
