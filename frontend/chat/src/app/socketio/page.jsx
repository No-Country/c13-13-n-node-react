"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect ("https://c13-13-n-node-react-backend.onrender.com/")

export default function Socket() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");



  /**useEffect(()=>{
        socket.on("receive_message",(data)=>{
            alert(data.message)
        })
    },[socket]) */

  /**How it should be on the backend
    io.on("connection", (socket)=>{
        console.log(`User Connected: ${socket.io}`);

     socket.on("send_message",(data)=>{
        de esta manera se envia el mensaje a todos los conectados:
        socket.broadcast.emit("receive_message, data")

        console.log(data)  este seria el mensaje recibido en el back del front
        })
    })*/


    const handleSubmit = (e) =>{
      e.preventDefault()     
      socket.emit("newMessage",message)
    }

    useEffect(()=>{
      socket.on("message",(message)=>{     
        setMessageReceived(message)
    })
,[socket]    })



  return (
    <div className="contarinerGral">
      <div className="winsowChat">

        <h5>{messageReceived}</h5>
      </div>

      <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        id="disabledInput"
        type="text"
        placeholder="Mensaje.."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button className="btn btn-primary">
        Enviar mensaje
      </button>
      </form>
    </div>
  );
}
