import mongoose from "mongoose";

const siteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Site name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Site = mongoose.model("Site", siteSchema);
export { Site };
