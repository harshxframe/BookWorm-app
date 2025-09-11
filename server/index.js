import express from "express";
import auth from "./routes/auth.js";
import cors from "cors";
import review from "./routes/reviews.js";
import connectDB from "./libs/dbConnector.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();



app.get("/",(req,res)=>{
    res.send("Hello I am live.");
})
app.use("/app",auth);   //for authetification
app.use("/app",review); //for review creation




app.listen(2000, ()=>{
    console.log("Server started!");
});