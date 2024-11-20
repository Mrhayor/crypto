import express from "express";
import dotenv from "dotenv";
import {connectDb} from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); //allows us to parse incoming request:req.body

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    connectDb()
    console.log('server started')
});



//  nMKUVfua26VPMLQD

