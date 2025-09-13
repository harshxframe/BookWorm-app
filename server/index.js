import express from "express";
import auth from "./routes/auth.js";
import cors from "cors";
import review from "./routes/reviews.js";
import connectDB from "./libs/dbConnector.js";
import dotenv from "dotenv";
import path from "path";
import { apiResponse } from "./Utils/apiResponse.js";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

// top of server file (index.js)
app.use((req, res, next) => {
  try {
    // Safe debug / compatibility headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Force plain JSON and no compression or keep-alive weirdness
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Connection', 'close');             // close after response
    // Ensure proxies don't gzip this route unexpectedly (Cloudflare may still override)
    res.setHeader('Cache-Control', 'no-transform');   // hint to proxies not to modify
  } catch (e) { /* ignore */ }
  next();
});

// reliable plain health route — explicit length, closes connection
app.get('/health-check-ios', (req, res) => {
  const payload = JSON.stringify({ ok: true, now: new Date().toISOString() });
  res.setHeader('Content-Length', Buffer.byteLength(payload, 'utf8'));
  res.status(200).send(payload);
});


app.get('/health-check-plain', (req, res) => {
  const payload = JSON.stringify({ ok: true, now: new Date().toISOString() });
  // set explicit content-length
  res.setHeader('Content-Length', Buffer.byteLength(payload, 'utf8'));
  res.status(200).send(payload);
});




app.get("/",(req,res)=>{
    res.send(apiResponse(false,{},"system running health check OK",201));
})
app.use("/app",auth);   //for authetification
app.use("/app",review); //for review creation




app.listen(2000, ()=>{
    console.log("Server started!");
});

