"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default function NewRoom({ user }) {

  const router = useRouter(); 
  const [cargando, setCargando] = useState(false);
  const [loadingImage, setloadingImage] = useState(false); 
  const [formComplete, setFormComplete] = useState(false);   
  const [formData, setFormData] = useState({
    title: "",
    createdBy: user.id,
    maxParticipants: "",
    image: "",
  });

  useEffect(() => {
    // Verificar si todos los campos requeridos están completos
    console.log(formData);
    const isFormComplete =
      formData.title !== "" &&
      formData.createdBy !== "" &&
      formData.maxParticipants !== "" &&
      formData.image !== "" 
    setFormComplete(isFormComplete);
  }, [formData]);

  const handleAvatarChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0]
    // console.log(file)
    const formData = new FormData();
    // console.log(file)
    formData.append('file', file);
    formData.append('upload_preset', 'TellMeChat')
    formData.append('api_key', 317454741746325);
    setloadingImage(true)
    const res = await fetch('https://api.cloudinary.com/v1_1/TellMe/image/upload',
        {
            method: "POST",
            body: formData
        })
        const cloudinaryData = await res.json();
        const uploadedUrl = cloudinaryData.secure_url
    setloadingImage(false)
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: uploadedUrl,
    }));
  }


  // const fetchData = async () => {
  //   try {
  //    setCargando(true)
  //     const dataResponse = await fetchFunctions.POST(
  //       "https://c13-13-n-node-react-backend.onrender.com/rooms/newroom",
  //       formData
  //     );
  //     setCargando( false) 
  //     router.push(`/auth/dashboard`);
  //     } catch (error) {
  //     console.error("Error al crear la sala:", error);
  //   }
   
  // };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCargando(true)
       const dataResponse = await fetchFunctions.POST(
         "https://c13-13-n-node-react-backend.onrender.com/rooms/newroom",
         formData
       );
       setCargando( false) 


 if (dataResponse.error === `${formData.title} already exists`) {
    Swal.fire({
      icon: "error",
      title: "Error en el Registro",
      text: `Ya existe una sala con el nombre ${formData.title}.`,
      width: "25em",
      padding: "1rem",
    });
  } else if (dataResponse.length > 30) {
    Swal.fire({
      icon: "success",
      title: "Registro Exitoso",
      text: `¡Sala ${formData.title} creada correctamente!`,
    }).then((r) => {
      // console.log(r);
      if (r.isConfirmed) {
        router.push("/auth/dashboard");
      }
    });
  } else {
    alert("No se puede crear la sala");
  } 
       } catch (error) {
       console.error("Error al crear la sala:", error);
     }



  
    
    
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
            name="title"
            type="text"
            className="form-control"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        <div className="mb-3">
          <label htmlFor="maxParticipants" className="form-label">
            Max Participants:
          </label>
          <input
            name="maxParticipants"
            type="number"
            className="form-control"
            id="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleInputChange}
          />
        </div>
        </div>
        {loadingImage? ( <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693864078/loading_..._hfexoy.gif" style={{ width: "200px", height:"200px", marginTop:"10%"  }} alt="cargando..." />) :(
<div className="imagen" style={{display:"flex", flexDirection:"column", flexWrap:"wrap", alignItems:"center"}}>
        <div className="form-group">
          <label htmlFor="exampleInputAvatar" className="form-label mt-4">
            Imagen de perfil
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputAvatar"
            name="image"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        {formData.image !== ""?
(<div>
      <img src={formData.image} alt="" style={{ width: "200px", height:"200px", marginTop:"10%" }}/>
    </div>): <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693605320/NoCountry/no-product-image-400x400_1_ypw1vg.png" alt="" style={{ width: "200px", height:"200px", marginTop:"10%" }}/>
    }
    </div> 

)}
      <button style={{ marginTop:"5%" }} type="submit" className="btn btn-primary">
          Crear Sala
        </button>
      </form>
      {cargando ? ("Cargando...") : ("")}
    </div>
  );
}
