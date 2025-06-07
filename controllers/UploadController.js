import File from '../models/Files.js';

export const uploadFile = async (req, res) => {
  try {
    const { bookId } = req.body;

    const file = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      bookId,
      uploadedBy: req.user.id,
    });

    await file.save();
    res.status(201).json({ message: 'File uploaded', file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFilesByBook = async (req, res) => {
  const { bookId } = req.params;
  const files = await File.find({ bookId });
  res.json(files);
};