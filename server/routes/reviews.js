import express from "express";
import { createReview, getReivew } from "../controllers/review.js";
import { deleteReview } from "../controllers/review.js";
import { uploadImage } from "../Utils/upload.js";
import multer from "multer";
const route = express.Router();
const upload = multer();



route.post("/review",uploadImage, createReview);
route.delete("/review",upload.none(), deleteReview);
route.get("/review",upload.none(),getReivew)



export default route;