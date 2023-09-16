"use client";
import { useState, useEffect } from "react";
import Profile from "@/components/profile";
import NewRoomComponent from "@/components/newroom";
import Rooms from "../rooms/rooms";
import SelectedRoom from "../rooms/selectedRoom";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { transition } from "@cloudinary/url-gen/actions/effect";
import * as fetchFunctions from "@/utils/fetch/fetch";
import "./page.css";
import { useAuth } from '../../../contexts/AuthContext';
import { GiExitDoor } from "react-icons/gi";
import {BsInfoSquare } from "react-icons/bs";
 
// import { io } from "socket.io-client";
// const socket = io("https://c13-13-n-node-react-backend.onrender.com")
//guardar en URL https://c13-13-n-node-react-backend.onrender.com o http://localhost:8080

export default function Dashboard() {
  const Url= process.env.NEXT_PUBLIC_API_BASE_URL
  const { user } = useAuth();
  const [newRoom, setnewRoom] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setcurrentRoom] = useState(null);
  const [allRooms, setallRooms] = useState();
  const [userRooms, setuserRooms] = useState();
  const [cargando, setCargando] = useState(false);
  const [infoSala, setinfoSala] = useState(false);
  
  const router = useRouter();

  const userData = Cookies.get("userData")
  const initialUserData = userData? JSON.parse(userData) : null

  // console.log('tus salas', userRooms);
  // console.log('todas las salas', allRooms);
  useEffect(() => {
    if (initialUserData) {
      // Si hay un usuario en el contexto, establece currentUser
      setCurrentUser(initialUserData.user);
      fetchData(initialUserData.user)
    } else {
      router.push(`/`);
      return; // Salir de la función si no hay datos de usuario
    }
  }, []);


  async function fetchData(user) {
    try {
      if (!currentUser && initialUserData) {
        setCurrentUser(initialUserData.user);
      } 

      setCargando(true);
      const userId = user.id || initialUserData.user.id; // Asegúrate de ajustar esto según tu estructura de datos
      const userRoomsUrl =`${Url}/rooms/${userId}`;

      if(userId){const userRoomsResponse = await fetchFunctions.GET(userRoomsUrl);
      setuserRooms(userRoomsResponse);}

      const allRoomsResponse = await fetchFunctions.GET(`${Url}/rooms/all`);
      setallRooms(allRoomsResponse);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar las salas:", error);
    }
  }


  async function changeRoom() { 
    window.location.reload();
  }

  async function handleNewRoom() {
    setnewRoom(!newRoom);
    setcurrentRoom(null)
  }
  async function getDataUser() {
    console.log("funcion entrar a sala");
  }
  async function selectedRoomId(e) {
    // e.preventDefault(); 
    // console.log(allRooms)
    // console.log(e);
    const actualroom = await allRooms.find((r) => r.id == e);
    console.log(actualroom);
    if(actualroom){setcurrentRoom(actualroom)
    }else{
  setcurrentRoom(null)}
  }
  
  const handleInfoSala = () => {
    setinfoSala(!infoSala)
  };
  

  console.log(currentRoom);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",

        }}
      >
        
        <Profile />

      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: currentRoom ? "flex-start" : "center",
          boxShadow: "0px 0px 20px 8px #bce1d6",
          margin: "2%",
          padding: "2%"
        }}
      >
        {newRoom ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <NewRoomComponent user={currentUser} />
            <hr></hr>
            <button
              type="button"
              onClick={handleNewRoom}
              className="btn btn-outline-info"
            >
              Atrás
            </button>{" "}
          </div>
        ) : (
          
          <div
            style={{
              display: "flex",
              alignItems: currentRoom ? "normal" : "center",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"space-around" }}>
            {currentRoom && (
                <SelectedRoom user={currentUser} currentRoom={currentRoom} roomsUser={userRooms} />
              )}
              <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", margin: "5%" }}>
                
                {cargando ? (<div style={{ display: "flex", justifyContent: "center", width: "100%" }}> <img style={{ width: "15%" }} src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693864078/loading_..._hfexoy.gif" alt="" /></div>) : ( currentUser&&<div className="dashboard-container" >
                {!currentRoom? (
                  <div>
                <p className="text-primary" style={{ textAlign: "center" }}>SALAS DISPONIBLES</p>
                <Rooms user={currentUser} selectedRoomId={selectedRoomId} rooms={allRooms} roomsUser={userRooms} style={{ width: "100%" }} />
                <div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", marginTop: "10%" }}>

                  <p className="text-info" style={{ textAlign: "center" }}>CREAR UNA SALA</p>
                  <button
                    type="button"
                    onClick={handleNewRoom}
                    className="btn btn-outline-info"
                  >
                    Crear Sala
                  </button>
                </div></div>
                ): (
                  <div>
                    <div style={{ display: "flex", flexDirection: "column", alignContent: "center", width:"100%", alignItems: "center"}}>
                <button
                type="button"
                onClick={changeRoom}
                className="btn btn-outline-warning btn-sm"
              > 
                Cambiar Sala <GiExitDoor className="me-2" />
              </button></div>
              {/* setinfoSala */}
              <div style={{ display: "flex", flexDirection: "column", width:"100%", alignContent: "center", alignItems: "center", marginTop: "5%" }}>
                <button
                type="button"
                onClick={handleInfoSala}
                className="btn btn-outline-info btn-sm"
              >
                Informacion de la sala  <BsInfoSquare className="me-2" />
              </button></div>
              {infoSala?
                   ( <div className="card border-info mb-3" style={{maxWidth: "20rem",minWidth:"15rem",margin:"2%", display:"flex", justifyContent:"center"}}>
                  <div className="card-header">{currentRoom.title}</div>
                  <div className="card-body">
                    <h4 className="card-title">{currentRoom.profile}</h4>
                    <p className="card-text"> 
                    Límite de usuarios: {currentRoom.maxParticipants}
                    <hr />
                    Usuarios actuales: {currentRoom.participants}
                    <hr />
                    Estado: {currentRoom.status}
                    </p>
                  </div>
                  <hr />
                  <img src={currentRoom.image} style={{ width: "40%",alignSelf:"center", margin:"2%" }} alt="imagen" />
                </div>) : <div></div>}
                </div>)
              }
                </div>)}
                

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
