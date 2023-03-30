const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const express = require("express");
const router = express.Router();

const storeAvatar = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storeAvatar);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: 1048576,
});

const upload = multer({ storage });

router.post("/", upload.single("avatar"), async (req, res, next) => {
  const { path: tempName, originalname } = req.file;

  const fileName = path.join(storeAvatar, originalname);

  try {
    await fs.rename(tempName, fileName);
  } catch (error) {
    await fs.unlink(tempName);
    next(error);
  }

  return res.status(200).send("File uploaded");
});

module.exports = router;
