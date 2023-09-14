// routes/chat.js
const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router.post('/newroom', async (req, res) => {
  const { title, createdBy, maxParticipants, image } = req.body;
  if (!title || !createdBy) {
    return res.status(400).json({ error: 'Room title and createdBy is required' });
  }
  try {
    const chat = await RoomController.createRoom(title, createdBy, maxParticipants, image);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  const allrooms = await RoomController.getAllRooms();
  res.json(allrooms);
});
//unir usuario a sala
router.post('/join', async (req, res) => {
  const { userId, roomId } = await req.body;
  result = await RoomController.JoinUserToRoom(userId, roomId);
  console.log(result);
  res.json(result);
});
//salas donde esta activo el usuario
router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const userRooms = await RoomController.getUserRooms(usuarioId);
  res.json(userRooms);
});
// editar eliminar, fijar y modificar salas
router.put('/update/:roomId', async (req, res) => {
  //status: 'active', 'deleted', 'edited', 'fixed'
  const { roomId } = req.params;
  const {title, maxParticipants, image, status } = req.body
  // console.log(roomId, title, maxParticipants, image, status)
  const updatedRoom= await RoomController.updateRoom(roomId, title, maxParticipants, image, status );
  res.json(updatedRoom);
});

router.put('/delete/:roomId', async (req, res) => {
  const { roomId } = req.params;
  // console.log(roomId, title, maxParticipants, image, status)
  const deletedRoom= await RoomController.deleteRoom(roomId);
  res.json(deletedRoom);
});

module.exports = router;