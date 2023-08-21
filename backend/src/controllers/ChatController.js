// controladores/ChatController.js
const { log } = require('console');
const { User, Chat } = require('../db');

async function createChat(title){
    const existingChat = await Chat.findOne({
        where: {
            title: title,
        },
      });
      if (existingChat) {
        return `${title} already exists`;
      }
      const chat = await Chat.create({
        title: title
      });
      return chat
}
// Unir un usuario a un chat
async function unirUsuarioAChat(userId, chatId) {
  const user = await User.findByPk(userId);
  const chat = await Chat.findByPk(chatId);
  console.log(user);
  if (!user || !chat) {
    return 'The user has not been able to join the chat'
  }
  await user.addChat(chat);
  return `The ${user.email} has successfully joined the ${chat.title}`
}

// Obtener chats de un usuario
async function obtenerChatsDeUsuario(userId) {
  const usuario = await User.findByPk(userId, {
    include: [{ model: Chat }],
  });
  if (!usuario) {
    // Manejo de error si el usuario no existe
  }
  const chats = usuario.Chats;
  // Retornar la lista de chats
}

module.exports = { createChat, unirUsuarioAChat };