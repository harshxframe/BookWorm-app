import multer from "multer";
import path from "path";
import fs from "fs";

const dir = path.join(process.cwd(), "uploads", "images");
fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

function filter(_req, file, cb) {
  cb(file.mimetype.startsWith("image/") ? null : new Error("Images only"), file.mimetype.startsWith("image/"));
}

export const uploadImage = multer({
  storage,
  fileFilter: filter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("bookImg");
