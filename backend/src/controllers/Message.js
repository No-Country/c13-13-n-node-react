const { Message, User } = require('../db');


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
    const messages = await Message.findAll({
      where: {
        roomId: roomId,
      },
    });
    const users = await User.findAll();
    const userMap = new Map();
    users.forEach((user) => userMap.set(user.id, user));

    const mensajesTransformados = await Promise.all(
      messages.map(async (mensaje) => ({
        room: mensaje.roomId,
        usuario: userMap.get(mensaje.senderId).fullname,
        mensaje: mensaje.content,
      }))
    );
    // console.log(mensajesTransformados);


    return mensajesTransformados;
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
    const messageDelete = await Message.update({
      status: 'deleted'
    }, {
      where: {
        id: messageId
      }
    }
    )
    return (`The product ${messageId} was successfully removed`, messageDelete)
  }
}
async function editMessage(messageId, content) {
  if (!messageId) {
    throw new Error('You must enter the message to edit')
  }
  const searchMessage = await Message.findOne({
    where: {
      id: messageId,
    },
  });
  if (!searchMessage) {
    throw new Error(`The message ${messageId} cannot be found to edit`)
  } else {
    const messageEdited = await Message.update({
      content: content,
      status: 'edited'
    }, {
      where: {
        id: messageId
      }
    }
    )
    return (`The product ${messageId} was successfully edited`, messageEdited)
  }
}

module.exports = { saveMessage, getAllMessages, deleteMessage, editMessage };