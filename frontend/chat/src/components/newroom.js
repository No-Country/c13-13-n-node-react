"use client";
import React, { useState } from "react";

export default function newroom () {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  
//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.value);
//   };

//   const handleMaxParticipantsChange = (e) => {
//     setMaxParticipants(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Aquí puedes realizar la lógica para enviar los datos al servidor
//     const newRoomData = {
//       title,
//       image,
//       maxParticipants,
//       createdBy: user.id, // Asumiendo que user contiene el ID del usuario actual
//     };

//     // Lógica para enviar newRoomData al servidor o realizar otras acciones
//     console.log("Nueva sala creada:", newRoomData);

//     // Limpia los campos del formulario después de enviar
//     setTitle("");
//     setImage("");
//     setMaxParticipants("");
//   };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={image} onChange={handleImageChange} />
      </div>
      <div>
        <label>Max Participants:</label>
        <input
          type="number"
          value={maxParticipants}
          onChange={handleMaxParticipantsChange}
        />
      </div>
      <button type="submit">Crear Sala</button>
    </form></div>
  );
};
