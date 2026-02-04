import express from 'express';
import axios from 'axios';

const router = express.Router();

const FLASK_API_URL = 'http://localhost:5001/api/chat'; 
router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await axios.post(FLASK_API_URL, { message });

    const reply = response.data.reply;

    res.json({ reply });
  } catch (error) {
    console.error('Error while communicating with Flask:', error.message);
    res.status(500).json({ error: error.message || 'Failed to communicate with Flask' });
  }
});

export default router;
