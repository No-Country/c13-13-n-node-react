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

async function getAllMessages(roomId) {
  try {
    const messages = await Message.findAll({ where: {
      roomId: roomId,
  }, });
    return messages;
  } catch (error) {
    console.error('Error al traer los mensajes:', error.message);
    return null;
  }
}

async function deleteMessage(messageId) {
  if (!messageId) {
      throw new Error('You must enter the message to delete')
  }
  const searchMessage = await Message.findOne({
      where: {
          id: messageId,
      },
  });
  if (!searchMessage) {
      throw new Error(`The message ${messageId} cannot be found to delete`)
  } else {
    const messageDelete =  await Message.update({
        status: 'delete'
      },{
        where: {
              id: messageId
          }}
      )
      return (`The product ${messageId} was successfully removed`,messageDelete)
  }
}


module.exports = { saveMessage, getAllMessages,deleteMessage  };