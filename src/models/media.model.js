import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video', 'other'],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    tags: [String],
    folder: {
      type: String,
      default: 'default',
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model('Media', mediaSchema);
export { Media };
