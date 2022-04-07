const mongoose = require('mongoose');

module.exports  = () => {
    
    try{
        const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
    
        const use = {useUnifiedTopology: true, useNewUrlParser: true};

        mongoose.connect( db , use );

        const development = process.env.NODE_ENV === "development";

        if (development) console.log("DB connection successful!");

    } catch (err){

        console.log("Could not connect to database");

    }

}