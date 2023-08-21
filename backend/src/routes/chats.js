// routes/chat.js
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router.post('/newchat', async (req, res) => {
  const { title, createdBy } = req.body;
  if (!title || !createdBy) {
    return res.status(400).json({ error: 'Room title and createdBy is required' });
  }
  try {
    const chat = await RoomController.createChat(title, createdBy);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/join', async (req, res) => {
  const { userId, chatId } = await req.body;
  result = await RoomController.unirUsuarioAChat(userId, chatId);
  res.send(result);
});

router.get('/:usuarioId/chats', async (req, res) => {
  const { usuarioId } = req.params;
  const chats = await RoomController.obtenerChatsDeUsuario(usuarioId);
  res.json(chats);
});

module.exports = router;