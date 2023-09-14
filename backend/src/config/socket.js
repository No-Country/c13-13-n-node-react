const socketIO = require('socket.io');
const { unirUsuarioAChat } = require('../controllers/RoomController');
const { register, login } = require('../controllers/authController');

module.exports = (io) => {
 
  let usersOnline = []

  // io.on('connection', (socket) => {
    //console.log('Usuario conectado: ' + socket.id);
    // Escucha eventos personalizados desde el cliente
    io.on('connection', (socket) => {
      console.log('Usuario conectado: ' + socket.id);
  
      // socket.broadcast.emit('chat_message', {
      //     usuario: 'INFO',
      //     mensaje: 'Se ha conectado un usuario'
      // });
      socket.on("join_room",  ({ username, roomId }) => {
            socket.join(roomId); // Unirse a la sala
            // Puedes enviar un mensaje o emitir un evento para notificar a los otros usuarios que alguien se unió a la sala
            io.to(roomId).emit('user_connected_notice', {mensaje:`${username} se ha unido a la sala.`});
          });
      socket.on('chat_message', (data) => {
        const {room, usuario, mensaje } = data;
        io.to(room).emit('chat_message', data);
      });

      
      socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado.');
      });


  });






  //   socket.on('joinRoom', async (userId, roomId) => {
  //     // Procesar el mensaje recibido y retransmitirlo a otros clientes
  //     await unirUsuarioAChat(userId, roomId)

  //     socket.join(roomId);
  //       // Emitir un evento para notificar al cliente que se unió a la sala
  //       io.to(socket.id).emit('roomJoined', `Te has unido a la sala ${roomId}`);

  //   //   io.emit('messageReceived', data);
  //   });
      
  //   //cuando se envia un mensaje
  //   socket.on('newMessage', async (data) => {

  //     socket.broadcast.emit('message', data)
  //     /**  const { content, senderId, roomId } = data;
  //       const message = await saveMessage(content, senderId, roomId);
  //       if (message) {
  //         io.to(roomId).emit('messageReceived', message);
  //       } */
  //     });
   
      
  //   //cuando se conecta nuevo usuario
  //   socket.on('newUser', async (user) => {
  //       console.log(user);
  //       socket.nickname = user
  //       usersOnline.push(socket.nickname)

  //       io.sockets.emit('usersNames', usersOnline)
  //     });


  //   // Manejo de desconexiones
  //   socket.on('disconnect', () => {
  //     console.log('Usuario desconectado: ' + socket.id);
  //   });
  // });

  // return io;
};