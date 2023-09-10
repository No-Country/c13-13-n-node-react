"use client";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";
const socket = io("https://c13-13-n-node-react-backend.onrender.com")
import * as fetchFunctions from "@/utils/fetch/fetch";
//Aca esta toda la logica de Socket.io del chat

export default function selectedRoom({user, currentRoom, roomsUser}) {


  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [roomFull, setroomFull] = useState(null);

console.log("estos son los mensajes", mensajes)
  useEffect(() => {
   
    socket.on("connect", setIsConnected(true));
// if (user){
//   setcurrentUser(user)
// }
// console.log(currentUser);
    socket.on("chat_message", (data) => {

      setMensajes((mensajes) => [...mensajes, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);

  useEffect(()=>{
    if(currentRoom && user){
      
         const joinuser = async () => {
         const data = {
        userId: user.user.id.toString(),
        roomId: currentRoom.id.toString()
      } 
      const datasocket = {
         username:user.user.fullname, 
          roomId:currentRoom.id  
      } 
        try {
  //         const dataResponse = await fetchFunctions.POST(
  //           "https://c13-13-n-node-react-backend.onrender.com/rooms/join", data
  //         );
  const dataResponse = await fetchFunctions.POST(
              "http://localhost:8080/rooms/join", data
            );
            console.log(datasocket); 
socket.emit("join_room", datasocket);
        //  console.log(dataResponse);   
         if(dataResponse === "Room is full"){setroomFull(true)}else{setroomFull(false)}
        } catch (error) {
          console.error("Error al cargar las salas:", error);
        }
      };

      joinuser();
      
    }
  }, [currentRoom]);

  const enviarMensaje = async () => {
const data = {
      room: currentRoom.id,
      usuario: user.user.fullname,
      mensaje: nuevoMensaje,
    }
    console.log(data); 
    await socket.emit("chat_message", data);
    setNuevoMensaje(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    enviarMensaje(); 
  };

  return (
    <div className="App">
{
  roomFull? ( <div style={{ margin: "2%", heigh:"100%", display:"flex", minHeight:"300px", border:"solid 1px #BCE1D6", minWidth:"350px", maxWidth:"500px", flexDirection:"column", justifyContent:"center",textAlign:"center" }}> No te puedes unir porque la sala está completa </div> ):
  ( <div>    <div style={{marginTop:"5%", display:"flex", justifyContent:"center"}}>
        <span className={isConnected ? "badge rounded-pill bg-info" : "badge rounded-pill bg-warning"}>{isConnected ? "Conectado a la sala " + currentRoom.title : "NO CONECTADO"}</span>
      </div>
      
     
      <div style={{ margin: "2%", heigh:"100%", display:"flex", minHeight:"300px", border:"solid 1px #BCE1D6", minWidth:"350px", maxWidth:"500px", flexDirection:"column" }}>
        <ul className="list-group">
          {mensajes.length? (mensajes.map((mensaje) => (
            <li
              key={mensaje.usuario} // Agregar una clave única
              className={
                mensaje.usuario !== socket.id
                  ? "list-group-item d-flex justify-content-between align-items-center"
                  : "list-group-item list-group-item-primary d-flex justify-content-between align-items-center"
              }
            >
              <span className="badge bg-primary rounded-pill">
                {mensaje.usuario}
              </span>{" "}
              {mensaje.mensaje}
            </li>
            ))): <div></div>}
        </ul>
      </div>

      <form className="input-group mb-3" style={{display:"flex", width:"100%", margin:"2%",flexDirection:"row"}} onSubmit={handleSubmit}> 
     
        <input
        type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"
          onChange={(e) => setNuevoMensaje(e.target.value)}
          value={nuevoMensaje} 
        style={{width:"80%"}}
        />
        <button className="btn btn-primary" style={{width:"20%"}} type="button" onClick={handleSubmit} id="button-addon2">Enviar</button> 
  
        
    
      </form>

      </div>)}
 
    </div>
  );
}