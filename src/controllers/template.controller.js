import Template from "../models/Template.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

// Create a new template
export const createTemplate = asyncHandler(async (req, res) => {
  const { name, components } = req.body;
  const user = req.user?._id;

  if (!name || !components) {
    throw new ApiError(400, "Name and components are required");
  }

  const template = await Template.create({ name, components, user });
  return res.status(201).json(new ApiResponse(201, template, "Template created"));
});

// Get template by ID
export const getTemplateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const template = await Template.findById(id);

  if (!template) {
    throw new ApiError(404, "Template not found");
  }

  return res.status(200).json(new ApiResponse(200, template));
});

// Update template
export const updateTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, components } = req.body;

  const template = await Template.findById(id);
  if (!template) {
    throw new ApiError(404, "Template not found");
  }

  if (name) template.name = name;
  if (components) template.components = components;
  await template.save();

  return res.status(200).json(new ApiResponse(200, template, "Template updated"));
});

// Delete template
export const deleteTemplate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const template = await Template.findById(id);
  if (!template) {
    throw new ApiError(404, "Template not found");
  }

  await template.deleteOne();
  return res.status(200).json(new ApiResponse(200, {}, "Template deleted"));
});
