// routes/chat.js
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

router.post('/newchat', async (req, res) => {
  const { titulo } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ error: 'El título del chat es requerido' });
  }

  try {
    const chat = await ChatController.crearChat(titulo);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/join', async (req, res) => {
  const { usuarioId, chatId } = req.body;
  await ChatController.unirUsuarioAChat(usuarioId, chatId);
  res.send('Usuario unido al chat');
});

router.get('/:usuarioId/chats', async (req, res) => {
  const { usuarioId } = req.params;
  const chats = await ChatController.obtenerChatsDeUsuario(usuarioId);
  res.json(chats);
});

module.exports = router;