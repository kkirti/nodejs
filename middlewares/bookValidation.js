export const validateBook = (req, res, next) => {
  const { title, author, publishedYear } = req.body;

  const errors = [];

  if (!title || typeof title !== 'string') {
    errors.push('Title is required and must be a string.');
  }

  if (!author || typeof author !== 'string') {
    errors.push('Author is required and must be a string.');
  }

  if (
    publishedYear === undefined ||
    typeof publishedYear !== 'number' ||
    !Number.isInteger(publishedYear)
  ) {
    errors.push('Published year is required and must be an integer.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};