"use client"

import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState } from "react";

export default function Dashboard() {
  const [email,setEmial] = useState("")
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [lastName,setLastName] = useState("")



  async function handleSubmit() {

   
  }
    return(  
    <div className="contarinerGral">
    <h1 className="title">SALAS DISPONIBLES</h1> 
    <div className="containerSec">
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 1</button>
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 2</button>
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 3</button>
    <button type="button" className="btn btn-primary" onClick={()=>{router.push(`/`)}} >SALA 4</button>
    </div>
    
    <div className="containerTer">
    <h1>CREAR UN CHAT</h1>  
      <div class="d-grid gap-2">
      <button class="btn btn-lg btn-primary" type="button">Crear una sala de chat</button>
    </div>
</div>
 



</div>  )
}