import mongoose from "mongoose";

export const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch(err){
        console.log("error to mongo db", err.message);
        process.exit(1);
    }
}