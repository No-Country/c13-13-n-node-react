"use client"
import { useEffect, useState } from "react"
import io from "socket.io-client"
//const socket =io.connect ("PORT")

export default function Socket() {
const [message, setMessage] = useState("")



    const sendMessage =()=>{
       // socket.emit("send_message",{message: "testing"})
       alert("msaje enviado" + " " + message); 
    }


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


    return(
        
        <div className="contarinerGral">

        <div className="winsowChat">
        <h2 >Diego Dimitroff </h2>
        <h5 >Mensaje enviado...</h5>
        </div>
        <input 
            className="form-control" 
            id="disabledInput" 
            type="text" 
            placeholder="Mensaje.." 
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}/>
        <button type="button" onClick={sendMessage} className="btn btn-primary">Enviar mensaje</button>
      
        </div>

    )
}