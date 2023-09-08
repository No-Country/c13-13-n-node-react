"use client";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";
const socket = io("https://c13-13-n-node-react-backend.onrender.com")

//Aca esta toda la logica de Socket.io del chat

export default function selectedRoom({user, currentRoom}) {


  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  console.log(user, currentRoom)

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

  const enviarMensaje = () => {
    socket.emit("chat_message", {
      usuario: user.user.fullname,
      mensaje: nuevoMensaje,
    });
    setNuevoMensaje(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    enviarMensaje(); 
  };

  return (
    <div className="App">
      <div style={{marginTop:"5%", display:"flex", justifyContent:"center"}}>
        <span className={isConnected ? "badge rounded-pill bg-info" : "badge rounded-pill bg-warning"}>{isConnected ? "CONECTADO" : "NO CONECTADO"}</span>
      </div>
      
     
      <div style={{ margin: "2%", heigh:"100%", display:"flex", minHeight:"300px", border:"solid 1px #BCE1D6", minWidth:"500px" }}>
        <ul className="list-group">
          {mensajes.map((mensaje) => (
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
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}> 
      <div className="input-group mb-3" style={{display:"flex", width:"80%", margin:"2%",flexDirection:"row"}}>
        <input
        type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"
          onChange={(e) => setNuevoMensaje(e.target.value)}
          value={nuevoMensaje} 
        style={{width:"100%"}}
        />
        <button className="btn btn-primary" type="button" id="button-addon2">Enviar</button> 
      </div>
        
    
      </form>
    </div>
  );
}