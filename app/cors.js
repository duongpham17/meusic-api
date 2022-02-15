const cors = require('cors');

module.exports = (app) => {

    const whitelist = ['http://localhost:3000']

    app.use(cors({
        origin: whitelist,
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
        exposedHeaders: ["set-cookie"]
    }));

}