"use client";

import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { parse } from "cookie";
import Profile from "@/components/profile";
import RoomComponent from "@/components/newroom";

export default function Dashboard() {
const [email, setEmail] = useState(""); // Corregido: Cambiado setEmial a setEmail
const [password, setPassword] = useState("");
const [name, setName] = useState("");
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
          <h3 className="title">SALAS DISPONIBLES</h3>
          <div className="containerSec">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                getDataUser(); 
              }}
            >
              SALA 1
            </button>
          </div>
          <h3>CREAR UNA SALA</h3>
          <div className="containerSec">
            <button
              type="button"
              onClick={handleNewRoom}
              className="btn btn-outline-info"
            >
              Crear Sala
            </button>
            <div className="d-grid gap-2"></div>
          </div>
        </div>
      )}
    </div>
  </>
);
}
