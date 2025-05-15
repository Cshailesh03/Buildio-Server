import express from 'express';
import { renderPage } from '../services/layoutRenderer.service.js';

const router = express.Router();

router.post('/render-layout', (req, res) => {
  try {
    const layoutTree = req.body;
    const html = renderPage(layoutTree);
    res.type('html').send(html);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
