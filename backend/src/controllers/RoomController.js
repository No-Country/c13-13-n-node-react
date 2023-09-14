// controladores/ChatController.js
const { log, error } = require('console');
const { User, Room } = require('../db');

async function createRoom( title, createdBy, maxParticipants, image ){
    const existingChat = await Room.findOne({
        where: {
            title: title,
        },
      });
      //createdBy es el id del usuario que crea la sala y directamente seria el primer miembro
      const user = await User.findByPk(createdBy);
      if(!user){ return 'The user is not found in the database'}
      if (existingChat) {
        return `${title} already exists`;
      }
      const room = await Room.create({
        title,
        createdBy,
        maxParticipants,
        image
      });
      await user.addRoom(room);
      return `The user ${user.email} created and successfully joined the ${room.title} room`
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
  const userRooms = await User.findByPk(userId, {
    include: [{ model: Room }],
  });
  const roomsArray = await userRooms.Rooms.map(e => e.id)
  // console.log(roomsArray);
  // console.log('salas del usuario', roomsArray);
  if (!user || !room) {
    return 'The user has not been able to join the chat'
  }

  if (!roomsArray.find(r => r == roomId)) {
    if (room.participants < room.maxParticipants) {
      Room.update({
        participants: room.participants + 1
      }, {
        where: {
          id: roomId,
        }
      });
      await user.addRoom(room);
      return `The user ${user.email} has successfully joined the ${room.title}`
    } else {
      return 'Room is full'
    }
  } else {
    return `the user ${user.email} is already in the room`
  }
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


async function updateRoom( roomId, title, maxParticipants, image, status ){
  //status: 'active', 'deleted', 'edited', 'fixed'
  const existingChat = await Room.findOne({
      where: {
          id: roomId,
      },
    });

    if (existingChat) {
      try{
        const room = await Room.update({
      title: title,
      maxParticipants: maxParticipants,
      image: image,
      status: status
    }, {
      where: {
        id: roomId,
      }
    });
    const newRoom = await Room.findOne({
      where: {
          id: roomId,
      },
    });
      return  newRoom;
      }catch (error){
       return error
      }
       
    }else{
     return `the room ${title} does not exist in the database`
    }
}

module.exports = { createRoom, JoinUserToRoom, getUserRooms, getAllRooms, updateRoom };