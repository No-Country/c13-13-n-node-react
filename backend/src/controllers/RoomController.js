// controladores/ChatController.js
const { log } = require('console');
const { User, Room } = require('../db');

async function createChat(title,createdBy){
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
// Unir un usuario a un chat
async function unirUsuarioAChat(userId, roomId) {
  const user = await User.findByPk(userId);
  const room = await Chat.findByPk(roomId);
  console.log(user);
  if (!user || !room) {
    return 'The user has not been able to join the chat'
  }
  await user.addChat(room);
  return `The user ${user.email} has successfully joined the ${room.title}`
}

// Obtener chats de un usuario
async function obtenerChatsDeUsuario(userId) {
  const usuario = await User.findByPk(userId, {
    include: [{ model: Room }],
  });
  if (!usuario) {
    return 'the user is not registered'
    // Manejo de error si el usuario no existe
  }
   return usuario.Room;
  

}

module.exports = { createChat, unirUsuarioAChat };