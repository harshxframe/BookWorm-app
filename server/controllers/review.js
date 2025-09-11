// controllers/review.controller.js
import { apiResponse } from "../Utils/apiResponse.js";
import review from "../models/review.js";
import path from "path";
import fs from "fs/promises";

export const createReview = async (req, res) => {
  try {
    const { name, rating, caption, email } = req.body;
    const file = req.file;

    if (!name || !rating || !caption || !email || !file) {
      return res.status(400).json(apiResponse(true, {}, "Payload not satisfied", 400));
    }

    const ratingNum = Number(rating);
    if (!Number.isFinite(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json(apiResponse(true, {}, "rating must be 1–5", 400));
    }

    const rel = path.join("uploads", "images", file.filename).replace(/\\/g, "/");
    const imageUrl = `${req.protocol}://${req.get("host")}/${rel}`;

    const doc = await review.create({
      title: name,
      rating: ratingNum,
      imgUrl: imageUrl,
      caption,
      email,
      // optionally also store filename to ease deletion later:
      fileName: file.filename,
    });

    return res.status(201).json(apiResponse(false, { data: doc }, "Review posted", 201));
  } catch (e) {
    console.error(e);
    return res.status(500).json(apiResponse(true, {}, "Internal Server Error", 500));
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.body; // or req.params.id if you use /:id
    if (!id) {
      return res.status(400).json(apiResponse(true, {}, "Payload not satisfied", 400));
    }

    // Find doc first (lets us delete the local file)
    const doc = await review.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json(apiResponse(true, {}, "Review not found", 404));
    }

    // OPTIONAL: remove local file if you saved fileName or can parse from imgUrl
    if (doc.fileName) {
      const absolute = path.join(process.cwd(), "uploads", "images", doc.fileName);
      try { await fs.unlink(absolute); } catch (_) { /* ignore if already gone */ }
    }

    return res.status(200).json(apiResponse(false, { id }, "Deleted successfully", 200));
  } catch (e) {
    console.error(e);
    return res.status(500).json(apiResponse(true, {}, "Internal Server Error", 500));
  }
};


export const getReivew = async (req, res) => {
  try {
    const { page, limit } = req.body;
    if (!page || !limit) {
      res.send(apiResponse(true, {}, "Required filed not found!", 401));
    } else {
      const finalPage = Math.max(1, parseInt(page || '1', 10));
      const finalLimit = Math.max(1, parseInt(limit || '10', 10));
      const skip = (finalPage - 1) * finalLimit;
      const reviewData = await review.find({}).skip(skip)
        .limit(finalLimit)
        .lean();
       
      if (reviewData.length > 0) {
        res.send(apiResponse(false, { reviewData }, "Success", 201));
      } else {
        res.send(apiResponse(false, {}, "Review Not aveliable", 201));
      }



    }


  } catch (e) {
    res.send(apiResponse(true, {}, "Server Internal Error" + e, 501));

  }
}
