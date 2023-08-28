"use client";
import { useRouter } from "next/navigation";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { parse } from 'cookie';
import Profile from "@/components/profile";


export default function Dashboard() {
  const [email, setEmail] = useState(""); // Corregido: Cambiado setEmial a setEmail
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
//*
 

  const goToUserProfile = () => {
  };

  async function handleSubmit() {
  }



  return (
    <div className="containerGral">
      {" "}
      <Profile/>
      <button onClick={goToUserProfile}>Ver Mi Perfil</button>
      <h1 className="title">SALAS DISPONIBLES</h1>
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
      <div className="containerTer">
        <h1>CREAR UN CHAT</h1>
        <div className="d-grid gap-2"></div>
      </div>
    </div>
  );
}
