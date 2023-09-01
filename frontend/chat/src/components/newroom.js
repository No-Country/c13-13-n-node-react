"use client";
import React, { useState } from "react";

export default function newroom({ user }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

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
      title: title,
      image:image,
      maxParticipants:maxParticipants,
      createdBy: "user.id"
    };

    console.log(newRoomData);
    const fetchData = async () => {
      try {
        const dataResponse = await fetchFunctions.GET(
          "https://c13-13-n-node-react-backend.onrender.com/rooms/all"
        );
        setRooms(dataResponse);
      } catch (error) {
        console.error("Error al cargar las salas:", error);
      }
    };
  };

  return (
    <div
      className="container"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h2>Nueva sala</h2>
      <hr></hr>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
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
}
