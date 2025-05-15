import { Site } from "../models/site.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import slugify from "slugify";

// POST /api/sites
export const createSite = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  const slug = slugify(name, { lower: true });

  const existing = await Site.findOne({ slug });
  if (existing) {
    throw new ApiError(409, "Site slug already exists. Choose another name.");
  }

  const site = await Site.create({
    name,
    slug,
    description,
    user: userId,
  });

  return res.status(201).json(new ApiResponse(201, site, "Site created"));
});

// GET /api/sites
export const getUserSites = asyncHandler(async (req, res) => {
  const sites = await Site.find({ user: req.user._id });
  return res.status(200).json(new ApiResponse(200, sites));
});

// GET /api/sites/:id
export const getSiteById = asyncHandler(async (req, res) => {
  const site = await Site.findById(req.params.id);
  if (!site) throw new ApiError(404, "Site not found");

  return res.status(200).json(new ApiResponse(200, site));
});

// PUT /api/sites/:id
export const updateSite = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const slug = slugify(name, { lower: true });

  const site = await Site.findByIdAndUpdate(
    req.params.id,
    { name, description, slug },
    { new: true }
  );

  if (!site) throw new ApiError(404, "Site not found");

  return res.status(200).json(new ApiResponse(200, site, "Updated"));
});

// DELETE /api/sites/:id
export const deleteSite = asyncHandler(async (req, res) => {
  const site = await Site.findByIdAndDelete(req.params.id);
  if (!site) throw new ApiError(404, "Site not found");

  return res.status(200).json(new ApiResponse(200, {}, "Deleted"));
});
