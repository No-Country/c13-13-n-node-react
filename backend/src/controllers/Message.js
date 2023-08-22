const { Message }= require('../db');


async function saveMessage(content, senderId, roomId) {
  try {
    const message = await Message.create({ content, senderId, roomId });
    return message;
  } catch (error) {
    console.error('Error al guardar el mensaje:', error.message);
    return null;
  }
}

module.exports = { saveMessage };