"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { parse } from "cookie";
import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("Cargando..");
  const [lastName, setLastName] = useState("Cargando..");
  const [avatar, setAvatar] = useState("Cargando..");
  const [email, setEmail] = useState("Cargando..");
  const [birthdate, setBirthdate] = useState("Cargando..");
  useEffect(() => {
    // Obtener el valor de la cookie directamente
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === "userData") {
        const userDataString = decodeURIComponent(cookieValue);
        
        const userData = JSON.parse(userDataString);
        console.log(userData);
        setName(userData.user.fullname);       
        setAvatar(userData.user.avatar);
        setEmail(userData.user.email);
        setBirthdate(convertirFecha(userData.user.birthdate));
        break; // Detener el ciclo una vez que se encuentra la cookie
      }
    }
  }, []);
  function convertirFecha(fecha) {
    var fech = fecha.split('/');
    return fech[2] + '-' + fech[1] + '-' + fech[0];
}
  return (
    <div className="contarinerGral">
      <p>Usuario: <strong>{name}</strong></p>
      <img src={avatar} style={{ width: "300px",  border: "1px solid black" }} alt="Avatar" />
      <br></br>
      <p>Email: <strong>{email}</strong></p>
      <p>Fecha de nacimiento: <strong>{birthdate}</strong></p>
    </div>
  );
}
