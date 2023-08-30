"use client";
import React, { useState } from "react";

export default function newroom ({user}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  console.log(user);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleMaxParticipantsChange = (e) => {
    setMaxParticipants(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar la lógica para enviar los datos al servidor
    const newRoomData = {
      title,
      image,
      maxParticipants,
      createdBy: user.id, // Asumiendo que user contiene el ID del usuario actual
    };

    // Lógica para enviar newRoomData al servidor o realizar otras acciones
    console.log("Nueva sala creada:", newRoomData);

    // Limpia los campos del formulario después de enviar
    setTitle("");
    setImage("");
    setMaxParticipants("");
  };

  return (
    <div className="container" style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
      <h2>Nueva sala</h2>
      <hr></hr>
    <form onSubmit={handleSubmit} style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image URL:
        </label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={handleImageChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maxParticipants" className="form-label">
          Max Participants:
        </label>
        <input
          type="number"
          className="form-control"
          id="maxParticipants"
          value={maxParticipants}
          onChange={handleMaxParticipantsChange}
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Crear Sala
      </button>
    </form>
  </div>
);
};
