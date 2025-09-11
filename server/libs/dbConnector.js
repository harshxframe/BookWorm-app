import mongoose from "mongoose";


const connectDB = async () => {
    const dbUrl = process.env.DB_URL;
    try {
        await mongoose.connect(dbUrl, {})
        console.log("DB connected!");
        return false;
    } catch (e) {
        console.log("Connection failed");
        return true;
    }
}



export default connectDB;

