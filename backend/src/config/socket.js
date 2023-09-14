const socketIO = require('socket.io');
const { unirUsuarioAChat } = require('../controllers/RoomController');
const { register, login } = require('../controllers/authController');

module.exports = (io) => {
 
  const connectedUsersByRoom = {};

  // io.on('connection', (socket) => {
    //console.log('Usuario conectado: ' + socket.id);
    // Escucha eventos personalizados desde el cliente
    io.on('connection', (socket) => {
      console.log('Usuario conectado: ' + socket.id);

      // connectedUsersByRoom[socket.id] = { usuario };
      // socket.to(room).emit('chat_message', {
      //     usuario: 'INFO',
      //     mensaje: 'Se ha conectado un usuario'
      // });
  // console.log(usersOnline);
      socket.on('chat_message', (data) => {
        const {room, usuario, mensaje } = data;
        io.to(room).emit('chat_message', data);
      });

      socket.on("join_room",  ({ username, roomId, users }) => {
        if (!connectedUsersByRoom[roomId]) {
          connectedUsersByRoom[roomId] = [];
        }
        connectedUsersByRoom[roomId].push(username);
        socket.join(roomId); // Unirse a la sala
        // Puedes enviar un mensaje o emitir un evento para notificar a los otros usuarios que alguien se unió a la sala
        io.to(roomId).emit("user_joined", {username, users} );
        io.to(roomId).emit("user_connected", connectedUsersByRoom[roomId]);
      });

      socket.on('leaveRoom', ({ roomId, username }) => {
        socket.leave(roomId);
        console.log(`Cliente ${username} abandonó la sala: ${roomId}`);
        if (connectedUsersByRoom[roomId]) {
          const index = connectedUsersByRoom[roomId].indexOf(username);
          if (index !== -1) {
            connectedUsersByRoom[roomId].splice(index, 1);
            io.to(roomId).emit("user_connected", connectedUsersByRoom[roomId]);
          }
        }
      })

      io.on('disconnect', (socket) => {
        console.log('Usuario desconectado: ' + socket.id);
      
      
        // const rooms = socket.rooms;
        // rooms.forEach((room) => {
        //   if (room !== socket.id && connectedUsersByRoom[room]) {
        //     const index = connectedUsersByRoom[room].indexOf(socket.username);
        //     if (index !== -1) {
        //       connectedUsersByRoom[room].splice(index, 1);
        //       io.to(room).emit("user_connected", connectedUsersByRoom[room]);
        //     }
        //   }
        // });
      
      });

console.log(connectedUsersByRoom);
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