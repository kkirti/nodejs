import express from 'express';
import multer from 'multer';
import { uploadFile, getFilesByBook } from '../controllers/UploadController.js';
import { authenticate } from '../middlewares/auth.js';
import { allowRoles } from '../middlewares/role.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/upload', authenticate, allowRoles('admin'), upload.single('file'), uploadFile);
router.get('/book/:bookId', authenticate, getFilesByBook);

export default router;