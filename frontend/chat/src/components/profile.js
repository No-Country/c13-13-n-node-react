"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
const [name, setName] = useState("Cargando..");
const [lastname, setLastName] = useState("Cargando..");
const [avatar, setAvatar] = useState(
"https://res.cloudinary.com/dbwmesg3e/image/upload/v1693444695/NoCountry/drawing-2802_256_pjv8li.gif"
);
const [email, setEmail] = useState("Cargando..");
const [birthdate, setBirthdate] = useState("Cargando..");

const router = useRouter();
const goToUserProfile = () => {
router.push("/auth/userProfile");
};

useEffect(() => {
// Obtener el valor de la cookie directamente
const cookies = document.cookie.split("; ");
for (const cookie of cookies) {
const [cookieName, cookieValue] = cookie.split("=");
if (cookieName === "userData") {
  const userDataString = decodeURIComponent(cookieValue);
  const userData = JSON.parse(userDataString);
  // console.log(userData);
  setName(userData.user.fullname);
  setAvatar(userData.user.avatar);
  setEmail(userData.user.email);
  setBirthdate(convertirFecha(userData.user.birthdate));
  break; // Detener el ciclo una vez que se encuentra la cookie
}
}
}, []);
function convertirFecha(fecha) {
var fech = fecha.split("/");
return fech[2] + "-" + fech[1] + "-" + fech[0];


}
return (
<>

<div className="contarinerGral"
      style={{ display: "flex", flexDirection:"column",width: "100%" , alignItems:"center", backgroundColor: "#bce1d6"}}
>
  <Link href= "./" onClick={()=>alert("si")}
  >
    <img
    src={avatar}
    style={{ width: "100px",borderRadius:"50%" }}
    alt="Avatar"
    />
  </Link>
  <div>Usuario: <strong>{name}</strong>
  </div>
  <div>
  Email: <strong>{email}</strong>
  </div>
  <div>
  Fecha de nacimiento: <strong>{birthdate}</strong>
  </div> 
  <button
    type="button"
    onClick={goToUserProfile}
    className="btn btn-outline-warning"
  >
    Editar Perfil
  </button>
  <button
    type="button"
    onClick={goToUserProfile}
    className="btn btn-danger"
  >
    Log Out
  </button>
</div>   
</>
);
}
