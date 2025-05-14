// src/controllers/media.controller.js

import { Media } from '../models/media.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');

  const { originalname, mimetype, size, buffer } = req.file;
  const folder = req.body.folder || 'default';

  const result = await uploadToCloudinary(buffer, originalname, mimetype, folder);

  const media = await Media.create({
    ownerId: req.user._id,
    filename: originalname,
    url: result.secure_url,
    public_id: result.public_id,
    type: mimetype.split('/')[0],
    size,
    folder,
    tags: req.body.tags || [],
  });

  return res.status(201).json(new ApiResponse(201, media, 'Media uploaded'));
});

const getAllMedia = asyncHandler(async (req, res) => {
  const media = await Media.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, media));
});

const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findOne({ _id: req.params.mediaId, ownerId: req.user._id });
  if (!media) throw new ApiError(404, 'Media not found');

  await deleteFromCloudinary(media.public_id, media.type);
  await media.deleteOne();

  return res.status(200).json(new ApiResponse(200, {}, 'Media deleted'));
});

export { uploadMedia, getAllMedia, deleteMedia };
