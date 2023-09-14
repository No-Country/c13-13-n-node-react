"use client";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useEffect, useState } from "react";
// import selectedRoom from "./selectedRoom";
import { useAuth } from '../../../contexts/AuthContext';

export default function Rooms({ user, selectedRoomId, rooms, roomsUser }) {

  // const [rooms,setRooms]= useState([])
  // const [cargando, setCargando] = useState(true);
  const [currentRoom, setcurrentRoom] = useState({});
  const [currentUser, setcurrentUser] = useState({});

  // const { user } = useAuth();
  console.log(user);



  // console.log(rooms);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ margin: "2%" }} className="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" style={{ width: "150px" }} className="btn btn-info" value={null} onClick={selectedRoomId}>Todas las salas</button>
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
            {rooms ? (rooms.map((room, index) =>
            (
              <a className="dropdown-item"
                key={index}
                onClick={() => selectedRoomId(room.id)}
              >{room.title}
                <a style={{ fontSize: "10px" }}> (miembros: {room.participants} / {room.maxParticipants})</a>
              </a>
            )
            )) : ("Cargando Salas... ")}
          </div>
          {/* 
 <selectedRoom user={currentUser} selectRoom={selectedRoom}/>  */}
        </div>
      </div>
      <div style={{ margin: "2%" }} className="btn-group" role="group" aria-label="Button group with nested dropdown">
        <button type="button" style={{ width: "150px" }} className="btn btn-info" value={null} onClick={selectedRoomId}>Tus salas</button>
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
            {roomsUser ? (roomsUser.map((room, index) =>
            (
              <a className="dropdown-item"
                key={index}
                onClick={() => selectedRoomId(room.id)}
              >{room.title}
                <a style={{ fontSize: "10px" }}> (miembros: {room.participants} / {room.maxParticipants})</a>
              </a>
            )
            )) : ("Cargando Salas... ")}
          </div>
          
        </div>
      </div>
    </div>
  );
}
