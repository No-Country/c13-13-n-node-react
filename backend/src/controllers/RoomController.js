// controladores/ChatController.js
const { log } = require('console');
const { User, Room } = require('../db');

async function createRoom(title,createdBy){
    const existingChat = await Room.findOne({
        where: {
            title: title,
        },
      });
      if (existingChat) {
        return `${title} already exists`;
      }
      const room = await Room.create({
        title,
        createdBy
      });
      return room
}
//Obtener todas las salas disponibles
async function getAllRooms(){
  const allRooms = await Room.findAll();
  // console.log(allRooms);
  return allRooms
}

// Unir un usuario a un chat
async function JoinUserToRoom(userId, roomId) {
  const user = await User.findByPk(userId);
  const room = await Room.findByPk(roomId);
  console.log(user);
  if (!user || !room) {
    return 'The user has not been able to join the chat'
  }
  await user.addRoom(room);
  return `The user ${user.email} has successfully joined the ${room.title}`
}

// Obtener salas de chat de un usuario
async function getUserRooms(userId) {
  const user = await User.findByPk(userId, {
    include: [{ model: Room }],
  });
  // console.log(user);
  if (!user) {
    return 'the user is not registered'
    // Manejo de error si el usuario no existe
  }
   return user.Rooms;
}

module.exports = { createRoom, JoinUserToRoom, getUserRooms, getAllRooms };