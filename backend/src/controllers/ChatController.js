// controladores/ChatController.js
const { User, Chat } = require('../db');



// Unir un usuario a un chat
async function unirUsuarioAChat(usuarioId, chatId) {
  const usuario = await User.findByPk(usuarioId);
  const chat = await Chat.findByPk(chatId);
  if (!usuario || !chat) {
    // Manejo de error si el usuario o el chat no existen
  }
  await usuario.addChat(chat);
  // Éxito
}

// Obtener chats de un usuario
async function obtenerChatsDeUsuario(usuarioId) {
  const usuario = await User.findByPk(usuarioId, {
    include: [{ model: Chat }],
  });
  if (!usuario) {
    // Manejo de error si el usuario no existe
  }
  const chats = usuario.Chats;
  // Retornar la lista de chats
}