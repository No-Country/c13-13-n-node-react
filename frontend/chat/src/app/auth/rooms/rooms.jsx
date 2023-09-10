"use client";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useEffect, useState } from "react";
// import selectedRoom from "./selectedRoom";
import { useAuth } from '../../../contexts/AuthContext';

export default  function Rooms({user, selectedRoomId, rooms}) {

// const [rooms,setRooms]= useState([])
const [roomsUser, setroomsUser] = useState([]);
// const [cargando, setCargando] = useState(true);
const [currentRoom, setcurrentRoom] = useState({});
const [currentUser, setcurrentUser] = useState({});

// const { user } = useAuth();
// console.log(user);
useEffect(() => {
  
  if(user){
    setcurrentUser(user)
  }
  // console.log(currentUser);
    // const fetchData = async () => {
    //   try {
    //     const dataResponse = await fetchFunctions.GET(
    //       "https://c13-13-n-node-react-backend.onrender.com/rooms/all"
    //     );
    //     setRooms(dataResponse);
    //     setCargando(false)
    //   } catch (error) {
    //     console.error("Error al cargar las salas:", error);
    //   }
    // };

    // fetchData();
  }, []);


// console.log(rooms);

return (
<div className="btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" className="btn btn-info" value={null} onClick={selectedRoomId}>Todas las salas</button>
  <div className="btn-group" role="group">
   <button 
    id="btnGroupDrop3" 
    type="button" 
    className="btn btn-info dropdown-toggle" 
    data-bs-toggle="dropdown" 
    aria-haspopup="true" 
    aria-expanded="false"
    
    >
    </button>
    <div className="dropdown-menu" aria-labelledby="btnGroupDrop3" >   
{ rooms ? (rooms.map((room, index) => 
  (
    <a className="dropdown-item" 
    key={index} 
    onClick={() => selectedRoomId(room.id)}
    >{room.title}
      <a style={{fontSize:"10px"}}> (miembros: {room.participants} / {room.maxParticipants})</a>
      </a>
    // <div style={{display:"flex",flexDirection:"column", width:"100%",alignItems:"center"}}
    // // style={{display:"flex",height:"100px" ,width:"auto"}}
    // >
    //       <button 
    //       key={index} 
    //       type="button" 
    //       className="btn btn-primary"
    //       value={room.id}
    //       style={{margin:"5px", width:"150px"}}
    //       onClick={selectedRoomId}
    //       > 
    //         
    //         <br />
    
    //       </button>
    //       <div>miembros: {room.participants} / 
    //         {room.maxParticipants}</div>
    //       </div>
    )
    )) : ("Cargando Salas... " )}
    </div>
{/* 
 <selectedRoom user={currentUser} selectRoom={selectedRoom}/>  */}
  </div>
</div>
  );
}
