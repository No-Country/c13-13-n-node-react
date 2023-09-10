
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
console.log(user);
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
    <>

{rooms ? (rooms.map((room, index) => (
  <div style={{display:"flex",width:"100%"}}
  // style={{display:"flex",height:"100px" ,width:"auto"}}
  >
        <button 
        key={index} 
        type="button" 
        className="btn btn-primary"
        value={room.id}
        style={{margin:"5px", width:"100px"}}
        onClick={selectedRoomId}
        > 
          {room.title}
        </button></div>
      ))) : ("Cargando Salas... " )}
{/* 
 <selectedRoom user={currentUser} selectRoom={selectedRoom}/>  */}

    </>
  );



}
