import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadMedia, getAllMedia, deleteMedia } from '../controllers/media.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT);


router.post('/upload', upload.single('file'), uploadMedia);
router.get('/', getAllMedia);
router.delete('/:mediaId', deleteMedia);

export default router;
