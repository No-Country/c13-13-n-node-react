"use client";
import { useState, useEffect } from "react";
import Profile from "@/components/profile";
import RoomComponent from "@/components/newroom";
import Rooms from "../rooms/rooms";

export default function Dashboard() {

const [newRoom, setnewRoom] = useState("");
const [currentUser, setCurrentUser] = useState({});



//*
// useEffect(() => {
//   // Obtener el valor de la cookie directamente
//   const cookies = document.cookie.split("; ");
//   for (const cookie of cookies) {
//     const [cookieName, cookieValue] = cookie.split("=");
//     if (cookieName === "userData") {
//       const userDataString = decodeURIComponent(cookieValue);
//       const userData = JSON.parse(userDataString);
//       setCurrentUser(userData)
//       // console.log(userData);
//       break; // Detener el ciclo una vez que se encuentra la cookie
//     }
//   }
// }, []);
// console.log(currentUser);



async function handleSubmit() {}

async function handleNewRoom() {
  setnewRoom(!newRoom);
}
async function getDataUser() {
  console.log("funcion entrar a sala");
}

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
        alignItems:"flex-end",
        
      }}
    >
      <Profile />

    </div>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 0px 20px 8px #bce1d6" ,
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
          <RoomComponent user={currentUser} />
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
            alignItems: "center",
            flexDirection: "column",
          }}
        >
            <div className="containerSec">
              <h3 className="title">SALAS DISPONIBLES</h3>
                <Rooms/>
            </div>
              
            <div className="containerSec">
              <h3>CREAR UNA SALA</h3>
                <button
                  type="button"
                  onClick={handleNewRoom}
                  className="btn btn-outline-info"
                >
                  Crear Sala
                </button>
            </div>
        </div>
      )}
    </div>
  </>
);
}
