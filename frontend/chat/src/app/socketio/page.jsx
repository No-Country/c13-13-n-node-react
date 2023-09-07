"use client";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";
const socket = io("http://localhost:8080")

export default function Socket() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("connect", setIsConnected(true));

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
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
    setNuevoMensaje(""); // Limpiar el campo de entrada después de enviar
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la acción de envío por defecto del formulario
    enviarMensaje(); // Llama a la función para enviar el mensaje
  };

  return (
    <div className="App">
      <div style={{marginTop:"5%", display:"flex", justifyContent:"center"}}>
        <span class={isConnected ? "badge rounded-pill bg-info" : "badge rounded-pill bg-warning"}>{isConnected ? "CONECTADO" : "NO CONECTADO"}</span>
      </div>
      
     
      <div style={{ margin: "2%" }}>
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
      <div class="input-group mb-3" style={{display:"flex", width:"80%", margin:"2%",flexDirection:"row"}}>
        <input
        type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"
          onChange={(e) => setNuevoMensaje(e.target.value)}
          value={nuevoMensaje} 
        style={{}}
        />
        <button class="btn btn-primary" type="button" id="button-addon2">Enviar</button> 
      </div>
        
    
      </form>
    </div>
  );
}
// "use client";
// import { useEffect, useState } from "react";
// import {io} from "socket.io-client";
// const socket = io("http://localhost:8080")

// export default function Socket() {

//   const [isConnected, setIsConnected] = useState(false);
//   const [nuevoMensaje, setNuevoMensaje] = useState('');
//   const [mensajes, setMensajes] = useState([]);

//   useEffect(() => {

//     socket.on('connect', () => setIsConnected(true));

//     socket.on('chat_message', (data) => {
//       setMensajes(mensajes => [...mensajes, data]);
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('chat_message');
//     }

//   }, []);

//   const enviarMensaje = () => {
//     socket.emit('chat_message', {
//       usuario: socket.id,
//       mensaje: nuevoMensaje
//     });
//   }

//   return (
//     <div className="App">
//       <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
//       <div style={{margin:"2%"}}>
// <ul class="list-group">
//         {mensajes.map(mensaje => (
//           <li class={mensaje.usuario==socket.id?"list-group-item d-flex justify-content-between align-items-center":"list-group-item list-group-item-primary d-flex justify-content-between align-items-center"}>
//              <span class="badge bg-primary rounded-pill">{mensaje.usuario}</span> {mensaje.mensaje}
//             </li>
//         ))}
//       </ul>

//       </div>
      
//       <input
//         type="text"
//         onChange={e => setNuevoMensaje(e.target.value)}
//       />
//       <button onClick={enviarMensaje}>Enviar</button>
//     </div>
//   );
// }

