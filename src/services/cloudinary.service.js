import { cloudinary } from '../config/cloudinary.config.js';

const uploadToCloudinary = async (fileBuffer, filename, mimetype, folder = 'default') => {
  const fileType = mimetype.split('/')[0]; // image, video, etc.

  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: fileType === 'image' ? 'image' : 'auto',
        public_id: filename.split('.')[0],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });

  return uploadResult;
};

const deleteFromCloudinary = async (public_id, resource_type = 'image') => {
  return cloudinary.uploader.destroy(public_id, { resource_type });
};

export { uploadToCloudinary, deleteFromCloudinary };
