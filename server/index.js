// import express from "express";
// import auth from "./routes/auth.js";
// import cors from "cors";
// import review from "./routes/reviews.js";
// import connectDB from "./libs/dbConnector.js";
// import dotenv from "dotenv";
// import path from "path";
// import { apiResponse } from "./Utils/apiResponse.js";
// dotenv.config();

// const app = express();

// app.use(cors({ origin: "*" }));

// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// connectDB();

// // // top of server file (index.js)
// // app.use((req, res, next) => {
// //   try {
// //     // Safe debug / compatibility headers
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// //     // Force plain JSON and no compression or keep-alive weirdness
// //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
// //     res.setHeader('Connection', 'close');             // close after response
// //     // Ensure proxies don't gzip this route unexpectedly (Cloudflare may still override)
// //     res.setHeader('Cache-Control', 'no-transform');   // hint to proxies not to modify
// //   } catch (e) { /* ignore */ }
// //   next();
// // });

// // reliable plain health route — explicit length, closes connection
// app.get('/health-check-ios', (req, res) => {
//   const payload = JSON.stringify({ ok: true, now: new Date().toISOString() });
//   res.setHeader('Content-Length', Buffer.byteLength(payload, 'utf8'));
//   res.status(200).send(payload);
// });


// app.get('/health-check-plain', (req, res) => {
//   const payload = JSON.stringify({ ok: true, now: new Date().toISOString() });
//   // set explicit content-length
//   res.setHeader('Content-Length', Buffer.byteLength(payload, 'utf8'));
//   res.status(200).send(payload);
// });




// app.get("/",(req,res)=>{
//     res.send(apiResponse(false,{},"system running health check OK",201));
// })
// app.use("/app",auth);   //for authetification
// app.use("/app",review); //for review creation




// app.listen(2000, ()=>{
//     console.log("Server started!");
// });


// server.js (drop-in)
import express from "express";
import auth from "./routes/auth.js";
import cors from "cors";
import review from "./routes/reviews.js";
import connectDB from "./libs/dbConnector.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

// Basic request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} → ${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
});

app.use(cors({ origin: "*" }));

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

connectDB();

// Always-return-JSON root & health
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "system running health check OK", timestamp: new Date().toISOString() });
});
app.get("/health-check", (req, res) => res.status(200).json({ ok: true, now: new Date().toISOString() }));

// App routes
app.use("/app", auth);
app.use("/app", review);

// 404 JSON
app.use((req, res) => {
  res.status(404).json({ success: false, error: true, message: "Not Found" });
});

// Global JSON error handler
app.use((err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err && (err.stack || err.message || err));
  if (err && (err.name === "MulterError" || /Unexpected end of form/i.test(err.message || ""))) {
    return res.status(400).json({ success: false, error: true, message: "Malformed or truncated form upload", detail: err.message });
  }
  res.status(err?.status || 500).json({
    success: false,
    error: true,
    message: err?.message || "Internal Server Error"
  });
});

// Use Render / environment port
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} env=${process.env.NODE_ENV || "dev"}`));
