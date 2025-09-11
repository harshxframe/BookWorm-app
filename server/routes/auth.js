import express from "express";
import { createAccount } from "../controllers/auth.js";
import { loginAccount } from "../controllers/auth.js";
import multer from "multer";
const route = express.Router();
const upload = multer();

route.post("/auth",upload.none(),createAccount);
route.get("/auth",upload.none(),loginAccount);


export default route;


