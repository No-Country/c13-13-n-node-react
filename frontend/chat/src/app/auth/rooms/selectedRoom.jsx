"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("https://c13-13-n-node-react-backend.onrender.com")
import * as fetchFunctions from "@/utils/fetch/fetch";
import { BsArrowRight } from "react-icons/bs";
//Aca esta toda la logica de Socket.io del chat

export default function selectedRoom({ user, currentRoom, roomsUser }) {


  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [roomFull, setroomFull] = useState(null);
  const [infosala, setinfosala] = useState(false);
// console.log(user, currentRoom, roomsUser );
  // console.log("estos son los mensajes", mensajes)
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

  useEffect(() => {
    if (currentRoom && user) {
      const joinuser = async () => {
        const data = {
          userId: user.id.toString(),
          roomId: currentRoom.id.toString()
        }
        const datasocket = {
          username: user.fullname,
          roomId: currentRoom.id
        }
        const msjURL =
          `https://c13-13-n-node-react-backend.onrender.com/message/${currentRoom.id}`
        // `http://localhost:8080/message/${currentRoom.id}`

        try {
          const allMsj = await fetchFunctions.GET(msjURL);
          console.log(allMsj);
          if (allMsj) {
            setMensajes(allMsj)
          }
          const dataResponse = await fetchFunctions.POST("https://c13-13-n-node-react-backend.onrender.com/rooms/join", data);
          // const dataResponse = await fetchFunctions.POST("http://localhost:8080/rooms/join", data);
          console.log(datasocket);
          socket.emit("join_room", datasocket);
          //  console.log(dataResponse);   
          if (dataResponse === "Room is full") { setroomFull(true) } else { setroomFull(false) }
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
      usuario: user.fullname,
      mensaje: nuevoMensaje,
    }
    const dataDB = {
      content: nuevoMensaje,
      senderId: user.id,
      roomId: currentRoom.id,
    }
    // console.log(dataDB);
    // console.log(data);
    await socket.emit("chat_message", data);
    const messageDB = await fetchFunctions.POST(
      // "http://localhost:8080/message/save", dataDB
      "https://c13-13-n-node-react-backend.onrender.com/message/save", dataDB
    );
    setNuevoMensaje("");
  };

  const setInfoSala = () => {
    setinfosala(!infosala)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarMensaje();
  };

  return (
    <div className="App">
      {
        roomFull ? (<div style={{ margin: "2%", heigh: "100%", display: "flex", minHeight: "300px", border: "solid 1px #BCE1D6", minWidth: "350px", maxWidth: "500px", flexDirection: "column", justifyContent: "center", textAlign: "center" }}> No te puedes unir porque la sala está completa </div>) :
          (<div style={{  display: "flex", flexDirection:"row", justifyContent: "center" }}>
            <div>    
              <div style={{ marginTop: "5%", display: "flex", justifyContent: "center", borderRadius:"10px important!" }}>
            <span style={{height:"30px", display:"flex", flexWrap:"wrap",alignContent:"center"}} className={isConnected ? "badge rounded-pill bg-info" : "badge rounded-pill bg-warning"}>{isConnected ? (
             <div>{"Conectado a la sala " + currentRoom.title }
              <button style={{height:"30px",paddingLeft:"10px",fontSize:"10px"}} type="button" onClick={setInfoSala} class="btn btn-outline-info">Info sala <BsArrowRight className="me-2" /></button>
             </div> ) : "NO CONECTADO"}</span>
          </div>
            <div style={{ margin: "2%", heigh: "100%", display: "flex", minHeight: "300px", border: "solid 1px #BCE1D6", minWidth: "350px", maxWidth: "500px", flexDirection: "column" }}>
              <ul className="list-group">
                {mensajes.length ? (mensajes.map((mensaje) => (
                  <li
                    key={mensaje.usuario} // Agregar una clave única
                    className={
                      mensaje.usuario !== user.fullname
                        ? "list-group-item d-flex justify-content-between align-items-center"
                        : "list-group-item list-group-item-primary d-flex justify-content-between align-items-center"
                    }
                  >
                   { mensaje.usuario !== user.fullname && <span className="badge bg-primary rounded-pill">
                      {mensaje.usuario}
                    </span>}
                    {" "}
                    {mensaje.mensaje}
                  </li>
                ))) : <div></div>}
              </ul>
            </div>

            <form className="input-group mb-3" style={{ display: "flex", width: "100%", margin: "2%", flexDirection: "row" }} onSubmit={handleSubmit}>
              <input
                type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"
                onChange={(e) => setNuevoMensaje(e.target.value)}
                value={nuevoMensaje}
                style={{ width: "80%" }}
              />
              <button className="btn btn-primary" style={{ width: "20%" }} type="button" onClick={handleSubmit} id="button-addon2">Enviar</button>
            </form>

          </div>
          
        { infosala&& <div className="card border-info mb-3" style={{maxWidth: "20rem",margin:"2%", display:"flex", justifyContent:"center"}}>
  <div className="card-header">{currentRoom.title}</div>
  <div className="card-body">
    <h4 className="card-title">{currentRoom.profile}</h4>
    <p className="card-text"> 
    Límite de usuarios: {currentRoom.maxParticipants}
    <hr />
    Usuarios actuales: {currentRoom.participants}
    <hr />
    Estado: {currentRoom.status}
    </p>
  </div>
  <hr />
  <img src={currentRoom.image} style={{ width: "40%",alignSelf:"center", margin:"2%" }} alt="" />
</div>}
          
          </div>
          )}

    </div>
  );
}