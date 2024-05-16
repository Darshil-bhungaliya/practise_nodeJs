import mongoose from "mongoose";

const connectDb = async(req,res)=>{
    try {
        const intialDB = await mongoose.connect("mongodb://localhost:27017/product");
        console.log(`🚀 MongoDb conncted successfully`)
    } catch (error) {
        console.log(`Mongodb connection Error:${error}`)
    }
}

export default connectDb;