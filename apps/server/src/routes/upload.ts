import { Router } from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';

const router = Router();

// Multer config
const storage = multer.diskStorage({
  destination: '/tmp',
  filename: (req, file, cb) => {
    const id = nanoid();
    cb(null, `${id}.mp3`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(new Error('Only MP3 files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  },
});

// POST /api/upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const id = path.parse(req.file.filename).name;
  const url = `/api/track/${id}`;

  res.json({ id, url });
});

// GET /api/track/:id
router.get('/track/:id', (req, res) => {
  const { id } = req.params;
  const filePath = path.join('/tmp', `${id}.mp3`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'File not found' });
    }
  });
});

export default router;
