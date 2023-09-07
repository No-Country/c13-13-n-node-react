"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

export default function Socket() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [historial, setHistorial] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("newMessage", message);
  };

  useEffect(() => {
    socket.on("message", (message) => {
      // Añadir el nuevo mensaje al historial
      setHistorial(prevHistorial => [...prevHistorial, message]);
      // Actualizar el mensaje recibido
      setMessageReceived(message);
    });
  }, []);

  return (
    <div className="contarinerGral">
     <div className="winsowChat">
        <h5>{messageReceived}</h5>
        {/* Mostrar el historial de mensajes */}
        {historial.map((mensaje, index) => (
          <div key={index}>{mensaje}</div>
        ))}
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
        <button className="btn btn-primary">Enviar mensaje</button>
      </form>
    </div>
  );
}
