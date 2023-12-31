"use client";
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";


export default function Register() {
  const Url= process.env.NEXT_PUBLIC_API_BASE_URL
  const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    avatar: null
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
      formData.birthdate !== "" &&
      formData.avatar !== null;
    setFormComplete(isFormComplete);
  }, [formData]);
  console.log(formData);

  async function handleSubmit(e) {
    e.preventDefault();

    const formToSend = {
      email: formData.email,
      role: "common",
      fullname: `${formData.lastName}, ${formData.name}`,
      profile: "",
      avatar: formData.avatar,
      birthdate: formData.birthdate,
      password: formData.password
    }
    // console.log(formToSend);
    // Enviar formData como objeto de datos
    setLoading(true);
    const result = await fetchFunctions.POST(
      `${Url}/auth/register`,
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

//sweet alert file:

const handleAvatarChange = async (e) => {
  const { value: file } = await Swal.fire({
    title: 'Select image',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Upload your profile picture'
    },
    showCancelButton: true,
  });
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'TellMeChat');
    formData.append('api_key', cloudinaryApiKey); 
    const res = await fetch('https://api.cloudinary.com/v1_1/TellMe/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const cloudinaryData = await res.json();
      const uploadedUrl = cloudinaryData.secure_url;
      // console.log(uploadedUrl);
      // setloadingImage(false)
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: uploadedUrl,
        }));
      Swal.fire({
        title: 'Your uploaded picture',
        imageUrl: uploadedUrl,
        imageAlt: 'The uploaded picture',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error uploading image',
        text: 'There was an error uploading the image.',
      });
    }
  }
}


  const handleCancel = () => {
    router.push("/");
    setFormData({
      name: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    avatar: null
    })
    
  };

  return (
    <div>

      <form
        className="contarinerGral"
        onSubmit={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        {loading && <div style={{ display: "flex", width: "100%", justifyContent: "center" }} ><img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1694041638/NoCountry/download-unscreen_j7cfgc.gif" alt="" style={{ width: "22%", height: "auto", marginTop: "10%", position: "fixed", alignContent: "center", zIndex: "1" }} /></div>}
        <fieldset style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", filter: loading ? "blur(1px)" : null }}>
        <div style={{ display: "flex", width: "100%", flexDirection:"row",flexWrap: "wrap", justifyContent:"space-around" }}>
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
          {loadingImage ? (
            <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693864078/loading_..._hfexoy.gif" style={{ width: "200px", height: "200px", marginTop: "10%" }} alt="cargando..." />
          ) : (formData.avatar ?
            (<div>
              <img src={formData.avatar} alt="" style={{ width: "200px", height: "200px", marginTop: "10%" }} />
            </div>) : (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}><img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693605320/NoCountry/no-product-image-400x400_1_ypw1vg.png" alt="" style={{ width: "220px", height: "220px", marginTop: "10%" }} />
              {!formData.avatar && <button style={{ marginTop: "10%" }} type="button" class="btn btn-outline-info btn-sm" onClick={handleAvatarChange}>Cargar foto de perfil</button>}
              </div>
            )
          )}
          </div >
          <div style={{ display: "flex", width: "100%", flexDirection:"row",flexWrap: "wrap", justifyContent:"center" }}>
          {!loading ? (
            <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formComplete}
              style={{ marginTop: "20px" }}
            >
              Registrarse
            </button>
            <button
            type="button"
            className="btn btn-danger"
            onClick={handleCancel}
            style={{ marginTop: "20px", marginLeft: "10px" }}
          >
            Cancelar
          </button>
          </div>) :
            (
              <div></div>
            )}</div>
        </fieldset>
      </form>
  
    </div>
  );
}
