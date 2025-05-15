import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiError } from '../utils/ApiError.js';

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import renderSection from '../templates/components/section.js';
import renderHeading from '../templates/components/heading.js';
import renderParagraph from '../templates/components/paragraph.js';
import renderButton from '../templates/components/button.js';

// Map node types to render functions
const componentMap = {
  section: renderSection,
  heading: renderHeading,
  paragraph: renderParagraph,
  button: renderButton
};

function renderNode(node) {
  const renderer = componentMap[node.type];
  if (!renderer) {
    console.warn(`No renderer for type: ${node.type}`);
    return '';
  }

  const childrenHTML = (node.children || []).map(renderNode).join('\n');
  return renderer(node.props || {}, childrenHTML);
}

export const renderLayoutToHTMLFile = async (layout, fileName = 'output.html') => {
  if (!layout || typeof layout !== 'object') {
    throw new ApiError(400, 'Invalid layout JSON');
  }

  const bodyContent = renderNode(layout);

  // Load base HTML template
  const baseTemplatePath = path.join(__dirname, '../templates/base.html');
  const baseHtml = await fs.readFile(baseTemplatePath, 'utf-8');

  const finalHtml = baseHtml.replace('<!--CONTENT-->', bodyContent);

  const outputDir = path.join(__dirname, '../../generated-pages');
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, fileName);
  await fs.writeFile(outputPath, finalHtml, 'utf-8');

  return outputPath;
};
