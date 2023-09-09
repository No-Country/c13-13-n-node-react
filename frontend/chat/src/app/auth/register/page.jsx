"use client";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    avatar:null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [loadingImage, setloadingImage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Verificar si todos los campos requeridos están completos
    const isFormComplete =
      formData.name !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      formData.password !== "" &&
      formData.birthdate !== ""&&
      formData.avatar !== null;
    setFormComplete(isFormComplete);
  }, [formData]);
console.log(formData);
  async function handleSubmit(e) {
    e.preventDefault();

    const formToSend = {
      email:formData.email,
      role:"common", 
     fullname: `${formData.lastName}, ${formData.name}`,
     profile:"", 
     avatar:formData.avatar,
     birthdate: formData.birthdate,
     password:formData.password
    }
    // console.log(formToSend);
    // Enviar formData como objeto de datos
    setLoading(true);
    const result = await fetchFunctions.POST(
      "https://c13-13-n-node-react-backend.onrender.com/auth/register",
      // "http://localhost:3001/auth/register",
      formToSend
    );
    setLoading(false);

    if (result.error === `${formData.email} email already exists`) {
      Swal.fire({
        icon: "error",
        title: "Error en el Registro",
        text: `El usuario con el correo electrónico ${formData.email} ya está registrado.`,
        width: "25em",
        padding: "1rem",
      });
    } else if (result.passwordToken) {
      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        text: `¡Usuario ${formData.email} registrado correctamente!`,
      }).then((r) => {
        // console.log(r);
        if (r.isConfirmed) {
          router.push("/auth/dashboard");
        }
      });
    } else {
      alert("Usuario o Password incorrecto");
    }
  }

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    console.log('soy la url nueva',uploadedUrl)
    setloadingImage(false)
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: uploadedUrl,
    }));
}


  return (
    <div> 
      
    <form
      className="contarinerGral"
      onSubmit={handleSubmit}
      style={{ marginTop: "20px"  }}
    >
      {loading && <div style={{ display: "flex", width: "100%", justifyContent: "center" }} ><img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1694041638/NoCountry/download-unscreen_j7cfgc.gif" alt="" style={{ width: "22%", height: "auto", marginTop: "10%", position: "fixed", alignContent: "center", zIndex:"1"}} /></div>}
      <fieldset style={{display:"flex", flexDirection:"row", flexWrap:"wrap",justifyContent:"space-between", filter:loading?"blur(1px)":null}}>
        <legend>Regístrate</legend>
<div className="datos">
        <div className="form-group">
          <label htmlFor="exampleInputname1" className="form-label mt-4">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputname1"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            aria-describedby="nameHelp"
            placeholder="Ingrese su nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputlastName1" className="form-label mt-4">
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputlastName1"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            aria-describedby="lastNameHelp"
            placeholder="Ingrese su apellido"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
            placeholder="Ingrese su correo electrónico"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Contraseña"
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputBirthdate1" className="form-label mt-4">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="form-control"
            id="exampleInputBirthdate1"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
          />
        </div>
        </div>


{loadingImage? ( <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693864078/loading_..._hfexoy.gif" style={{ width: "200px", height:"200px", marginTop:"10%"  }} alt="cargando..." />) :(
<div className="imagen" style={{display:"flex", flexDirection:"column", flexWrap:"wrap", alignItems:"flex-start"}}>
        <div className="form-group">
          <label htmlFor="exampleInputAvatar" className="form-label mt-4">
            Imagen de perfil
          </label>
          <input
            type="file"
            className="form-control"
            id="exampleInputAvatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            required
          />
        </div>
        {formData.avatar?
(<div>
      <img src={formData.avatar} alt="" style={{ width: "200px", height:"200px", marginTop:"10%" }}/>
    </div>): <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693605320/NoCountry/no-product-image-400x400_1_ypw1vg.png" alt="" style={{ width: "200px", height:"200px", marginTop:"10%" }}/>
    }
    </div> 
)}
      </fieldset>
       {loading? (
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formComplete}
          style={{ marginTop: "20px" }}
        >
          Registrarse
        </button>):
        (
          <div></div>
        )}
    </form>
    </div>
  );
}
