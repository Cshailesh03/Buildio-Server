import mongoose from "mongoose";
import  Page  from "../models/page.model.js";
import  {Site}  from "../models/site.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import { renderLayoutToHTMLFile } from '../services/layoutRenderer.service.js';

// CREATE PAGE
export const createPage = asyncHandler(async (req, res) => {
const { name, siteId, path, layout } = req.body;

if (!name || !siteId || !path || !layout) {
throw new ApiError(400, "All fields (name, siteId, path, layout) are required");
}

if (!mongoose.Types.ObjectId.isValid(siteId)) {
throw new ApiError(400, "Invalid siteId format");
}

const siteExists = await Site.findById(siteId);
if (!siteExists) {
throw new ApiError(404, "Site not found");
}

const userId = req.user?._id || req.body.userId;
if (!userId) {
throw new ApiError(400, "userId is required");
}
// console.log(userId);

const page = await Page.create({
  name,
  siteId,
  path,
  layout,
  userId 
});

await renderLayoutToHTMLFile(layout, `${page._id}.html`);


return res.status(201).json(
new ApiResponse(201, page, "Page created successfully")
);
});

// GET PAGE BY ID
export const getPageById = asyncHandler(async (req, res) => {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
throw new ApiError(400, "Invalid page ID");
}

const page = await Page.findById(id);

if (!page) {
throw new ApiError(404, "Page not found");
}

return res
.status(200)
.json(new ApiResponse(200, page, "Page fetched successfully"));
});

// UPDATE PAGE
export const updatePage = asyncHandler(async (req, res) => {
const { id } = req.params;
const { name, path, layout } = req.body;

if (!mongoose.Types.ObjectId.isValid(id)) {
throw new ApiError(400, "Invalid page ID");
}

const updatedPage = await Page.findByIdAndUpdate(
id,
{ name, path, layout },
{ new: true, runValidators: true }
);

if (!updatedPage) {
throw new ApiError(404, "Page not found");
}

return res
.status(200)
.json(new ApiResponse(200, updatedPage, "Page updated successfully"));
});

// DELETE PAGE
export const deletePage = asyncHandler(async (req, res) => {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
throw new ApiError(400, "Invalid page ID");
}

const deletedPage = await Page.findByIdAndDelete(id);

if (!deletedPage) {
throw new ApiError(404, "Page not found");
}

return res
.status(200)
.json(new ApiResponse(200, null, "Page deleted successfully"));
});


