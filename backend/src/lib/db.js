import mongoose from "mongoose"

import {ENV} from "./env.js"

export const connectDB = async() =>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined in environment variables");
        }
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB:",conn.connection.host)
    }catch(error){
        console.error("Error while connecting to MongoDB:", error.message);
        process.exit(1);
    }
}