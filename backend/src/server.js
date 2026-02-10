import express from "express";
import dotenv from "dotenv";
import {ENV} from "./lib/env.js"
dotenv.config();
const app = express();
console.log(ENV.DB_URL);
app.get("/",(req,res)=>{
    res.status(200).json({msg:"Success from api"})
})
app.listen( ENV.PORT,()=>{
    console.log("server running on,http://localhost:",ENV.PORT);
})