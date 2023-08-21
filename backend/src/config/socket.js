const socketIO = require('socket.io');
const { unirUsuarioAChat } = require('../controllers/RoomController');

module.exports = (socket) => {
  const io = socketIO(socket);

  io.on('connection', (socket) => {
    console.log('Usuario conectado: ' + socket.id);

    // Escucha eventos personalizados desde el cliente
    socket.on('joinRoom', async (userId, roomId) => {
      // Procesar el mensaje recibido y retransmitirlo a otros clientes
      await unirUsuarioAChat(userId, roomId)

      socket.join(roomId);
        // Emitir un evento para notificar al cliente que se unió a la sala
        io.to(socket.id).emit('roomJoined', `Te has unido a la sala ${roomId}`);

      io.emit('messageReceived', data);
    });

    // Manejo de desconexiones
    socket.on('disconnect', () => {
      console.log('Usuario desconectado: ' + socket.id);
    });
  });

  return io;
};