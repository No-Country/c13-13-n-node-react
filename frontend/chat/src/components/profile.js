"use client";
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'js-cookie';


export default function Profile() {

const { setUser } = useAuth();
const [name, setName] = useState("Cargando..");
const [lastname, setLastName] = useState("Cargando..");
const [openNavBar, setOpenNavBar] = useState(false);
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
console.log(userData.user.birthdate);
setName(userData.user.fullname);
setAvatar(userData.user.avatar);
setEmail(userData.user.email);
setBirthdate(convertirFecha(userData.user.birthdate));
break; // Detener el ciclo una vez que se encuentra la cookie
}
}
}, []);
function convertirFecha(fecha) {
var fech = fecha.split("-");
return fech[2] + "-" + fech[1] + "-" + fech[0];
}



function logOut() {
  if (Cookies.get('userData')) {
    Cookies.remove('userData', { path: '/auth' });
    Cookies.remove('userData', { path: '/' });
    setUser(null)
    router.push("/");
  } else {
    console.log("La cookie 'userData' no existe.");
  }
}


return (
<>
  <div className="contarinerGral"
          style={{ display: "flex", flexDirection:"column",width: "100%", minHeight: "1px",justifyContent: "space-around", alignItems:"center", backgroundColor: "#bce1d6",paddingTop:"0.5%",paddingBottom:"0.5%" }}
      >
      <Link href= "" onClick={()=>setOpenNavBar(!openNavBar)}
      >
        <img
        src={avatar}
        style={{ width: "100px",borderRadius:"50%", transform: "0.5", translate: "0.5", boxShadow: "0px 0px 20px 8px"}}
        alt="Avatar"
        />
      </Link>
      {openNavBar ? (
        <>
          <div style={{marginTop:"1%"}}>Usuario: <strong>{name}</strong>
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
        className="btn btn-outline-success"
        style={{ minWidth: "200px",marginTop:"1%"}}
      >
        Editar Perfil
      </button>




      <button
        type="button"
        onClick={logOut}
        className="btn btn-outline-success"
        style={{ minWidth: "200px",marginTop:"1%", marginBottom:"1%"}}
      >
        Log Out
      </button>
        </>
      ) : ("")}

  </div>   
</>
);
}
