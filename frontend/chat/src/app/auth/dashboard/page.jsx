"use client"
import { useRouter } from "next/navigation";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [email,setEmial] = useState("")
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const router = useRouter();

  const goToUserProfile = () => {
    // async getDataUser(){
  //   initialUserData = await fetchFunctions.GET(
  // "https://c13-13-n-node-react-backend.onrender.com/users/1",
  // data
  // }

// );
    router.push('/auth/userProfile');
  };

  async function handleSubmit() {

   
  }
    return(  
    <div classNameName="contarinerGral">
      <button onClick={goToUserProfile}>Ver Mi Perfil</button>
    <h1 className="title">SALAS DISPONIBLES</h1> 
    <div className="containerSec">
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 1</button>
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 2</button>
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 3</button>
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 4</button>
    </div>
    
    <div className="containerTer">
    <h1>CREAR UN CHAT</h1>  
      <div className="d-grid gap-2">
      
    </div>
    
</div>
 



</div>  )
}