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
import { io } from "socket.io-client";
const socket = io("https://c13-13-n-node-react-backend.onrender.com")

export default function Dashboard() {
  const { user } = useAuth();
  const [newRoom, setnewRoom] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoom, setcurrentRoom] = useState(null);
  const [allRooms, setallRooms] = useState();
  const [userRooms, setuserRooms] = useState();
  const [cargando, setCargando] = useState(false);

  const router = useRouter();

  
  // console.log('tus salas', userRooms);
  // console.log('todas las salas', allRooms);
  useEffect(() => {
    const userData = Cookies.get("userData")
    const initialUserData = userData? JSON.parse(userData) : null
    if (user && !currentUser) {
      // Si hay un usuario en el contexto, establece currentUser
      setCurrentUser(user);
      fetchData(user)
    }else if (initialUserData && !currentUser){
      const usuario = initialUserData.user
      // console.log(usuario);
      setCurrentUser(usuario);
      fetchData(usuario)
    } else {
      router.push(`/`);
      return; // Salir de la función si no hay datos de usuario
    }
  }, [user]);
// console.log(currentUser);

  async function fetchData(usuarioId) {
    console.log(usuarioId);
    try {
      setCargando(true);
      // Asegúrate de ajustar esto según tu estructura de datos

      if(usuarioId){
        const userId =usuarioId.id; 
        console.log(userId);
        const userRoomsUrl =
        `https://c13-13-n-node-react-backend.onrender.com/rooms/${userId}`;
      // `http://localhost:8080/rooms/${userId}`;
      const userRoomsResponse = await fetchFunctions.GET(userRoomsUrl);
      setuserRooms(userRoomsResponse);
      }

      const allRoomsResponse = await fetchFunctions.GET(
        "https://c13-13-n-node-react-backend.onrender.com/rooms/all"
        // "http://localhost:8080/rooms/all"
      );
      setallRooms(allRoomsResponse);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar las salas:", error);
    }
  }
  console.log("salas del usuario",userRooms);
  console.log("todas las salas",allRooms);
  async function handleSubmit() { }

  async function handleNewRoom() {
    setnewRoom(!newRoom);
    setcurrentRoom(null)
  }
  async function getDataUser() {
    console.log("funcion entrar a sala");
  }
  async function selectedRoomId(e) {
    // e.preventDefault(); 
    const actualroom = await allRooms.find((r) => r.id == e);
    setcurrentRoom(actualroom);
  }
  // console.log(currentRoom);
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
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", margin: "5%" }}>
                <p className="text-primary" style={{ textAlign: "center" }}>SALAS DISPONIBLES</p>
                {cargando ? (<div style={{ display: "flex", justifyContent: "center", width: "100%" }}> <img style={{ width: "15%" }} src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693864078/loading_..._hfexoy.gif" alt="" /></div>) : (<div className="dashboard-container" >
                  <Rooms user={currentUser} selectedRoomId={selectedRoomId} rooms={allRooms} roomsUser={userRooms} style={{ width: "100%" }} />
                </div>)}
                <div style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", marginTop: "20%" }}>

                  <p className="text-info" style={{ textAlign: "center" }}>CREAR UNA SALA</p>
                  <button
                    type="button"
                    onClick={handleNewRoom}
                    className="btn btn-outline-info"
                  >
                    Crear Sala
                  </button>
                </div>

              </div>
              {currentRoom && (
                <SelectedRoom user={currentUser} currentRoom={currentRoom} roomsUser={userRooms} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
