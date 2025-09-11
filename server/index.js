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

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

// Response logger + safe headers middleware
app.use((req, res, next) => {
  // Ensure CORS and simple headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // Force connection close to avoid keep-alive/tunneling issues
  res.setHeader('Connection', 'close');

  // When response finished, log status and length
  res.on('finish', () => {
    try {
      console.log('>>> RESPONSE FINISHED', {
        time: new Date().toISOString(),
        method: req.method,
        originalUrl: req.originalUrl,
        status: res.statusCode,
        contentLength: res.getHeader('content-length') || 'unknown',
        ip: req.ip || req.connection?.remoteAddress
      });
    } catch (e) { console.log('response logger err', e && e.message); }
  });

  next();
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