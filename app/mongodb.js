const mongoose = require('mongoose');

module.exports  = async () => {
    
    try{
        const db = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
    
        const use = {useUnifiedTopology: true, useNewUrlParser: true};

        await mongoose.connect( db , use );

        const enviroment = process.env.NODE_ENV === "development";

        if (enviroment) console.log("DB connection successful!");

    } catch (err){

        console.log("Could not connect to database");

    }

}