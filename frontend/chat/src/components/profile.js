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
        break; // Detener el ciclo una vez que se encuentra la cookie
      }
    }
  }, []);

  return (
    <div className="contarinerGral">
      <p>{name}</p>
      <img src={avatar} style={{ width: "300px",  border: "1px solid black" }} alt="Avatar" />
      <p>{email}</p>
    </div>
  );
}
