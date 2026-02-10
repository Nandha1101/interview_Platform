import express from "express";
import dotenv from "dotenv";
import {ENV} from "./lib/env.js";
import {serve} from "inngest/express";
import cors from "cors";
import {connectDB} from "./lib/db.js";
import {inngest,functions} from "./lib/inngest.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use("/api/inngest",serve({client:inngest}))

console.log(ENV.DB_URL);
app.get("/",(req,res)=>{
    res.status(200).json({msg:"Success from api"})
})
app.listen( ENV.PORT,()=>{
    console.log("server running on http://localhost:",ENV.PORT);
})

const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>{
            console.log("Server is running on port:",ENV.PORT)
        })
    }catch(error){
        console.error("Error starting the server",error);
    }
}