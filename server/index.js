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

// top of server file (index.js)
app.use((req, res, next) => {
  try {
    // always allow CORS for debugging
    res.setHeader('Access-Control-Allow-Origin', '*');

    // log what the server sees from the client
    console.log('>>> INCOMING DEBUG', {
      time: new Date().toISOString(),
      ip: req.ip || req.connection?.remoteAddress,
      host: req.headers.host,
      origin: req.headers.origin,
      ua: req.headers['user-agent']
    });

    // normalize user-agent so naive WAFs won't block it
    if (!req.headers['user-agent'] || /expo|hermes|node-fetch|axios|okhttp|curl/i.test(req.headers['user-agent'])) {
      req.headers['user-agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
    }
  } catch (e) {
    console.log('DEBUG middleware error', e && e.message);
  }
  next();
});

app.get('/health-check-debug', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    ok: true,
    time: new Date().toISOString(),
    ua_received: req.headers['user-agent'],
    host_received: req.headers.host
  });
});




app.get("/",(req,res)=>{
    res.send(apiResponse(false,{},"system running health check OK",201));
})
app.use("/app",auth);   //for authetification
app.use("/app",review); //for review creation




app.listen(2000, ()=>{
    console.log("Server started!");
});