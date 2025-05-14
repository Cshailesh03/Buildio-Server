import multer from 'multer';

const storage = multer.memoryStorage(); // buffer for Cloudinary upload
const upload = multer({ storage });

export { upload };
