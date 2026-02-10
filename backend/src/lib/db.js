import mongoose from "mongoose"

import {ENV} from "./env.js"

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(ENV.DB_URL)
        console.log("Connected to MongoDb:",conn.connection.host)
    }catch(error){
        console.error("Error while connecting to mongodb",error);
        process.exit(1)
    }
}
app.listen(ENV.PORT,() =>{
    console.log("Server is running on port:",ENV.PORT)
    connectDB();
});

