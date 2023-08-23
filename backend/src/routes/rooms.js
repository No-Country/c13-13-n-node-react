// routes/chat.js
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router.post('/newroom', async (req, res) => {
  const { title, createdBy } = req.body;
  if (!title || !createdBy) {
    return res.status(400).json({ error: 'Room title and createdBy is required' });
  }
  try {
    const chat = await RoomController.createRoom(title, createdBy);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  const allrooms = await RoomController.getAllRooms();
  res.json(allrooms);
});

router.post('/join', async (req, res) => {
  const { userId, roomId } = await req.body;
  result = await RoomController.JoinUserToRoom(userId, roomId);
  res.send(result);
});

router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const userRooms = await RoomController.getUserRooms(usuarioId);
  res.json(userRooms);
});

module.exports = router;