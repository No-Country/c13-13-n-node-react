"use client";
import { useRouter } from "next/navigation";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { parse } from 'cookie';
import Profile from "@/components/profile";
import newroom from "@/components/newroom";

export default function Dashboard() {
  const [email, setEmail] = useState(""); // Corregido: Cambiado setEmial a setEmail
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newRoom, setnewRoom] = useState("")

  const router = useRouter();

  //*


  const goToUserProfile = () => {

  };

  async function handleSubmit() {
  }

  async function handleNewRoom() {
    event.preventDefault()
    setnewRoom(!newRoom)
  }


  return (
    <div className="containerGral" style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px" }}>
      {" "}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "10%" }}>
        <Profile />
        <button type="button" onClick={goToUserProfile} class="btn btn-outline-warning">Editar Perfil</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "10%" }}>
        <h3 className="title">SALAS DISPONIBLES</h3>
        <div className="containerSec">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              getDataUser(); // Llamar a la función para obtener los datos del usuario
            }}
          >
            SALA 1
          </button>
        </div>
        {
          newRoom ? (
            <div>
              <RoomComponent />
              <button type="button" onClick={handleNewRoom} class="btn btn-outline-info">Atrás</button> </div>
          )
            : (<div> <h3>CREAR UN CHAT</h3>
              <div className="containerSec">
                <button type="button" onClick={handleNewRoom} class="btn btn-outline-info">Crear Sala</button>
                <div className="d-grid gap-2"></div>
              </div></div>)
        }



      </div>
    </div>
  );
}

