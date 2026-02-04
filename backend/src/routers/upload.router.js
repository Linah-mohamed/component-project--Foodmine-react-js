import { Router } from 'express';
import admin from '../middleware/admin.mid.js';
import multer from 'multer';
import handler from 'express-async-handler';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import path from 'path';
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

router.post(
  '/',
  admin,
  upload.single('image'),
  handler(async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(BAD_REQUEST).send({ error: 'No file uploaded' });
        return;
      }

      const imageUrl = `/uploads/${file.filename}`;

      res.send({ imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send({ error: 'Failed to upload image' });
    }
  })
);

export default router;
