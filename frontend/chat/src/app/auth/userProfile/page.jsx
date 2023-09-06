"use client";
//(id, email, role, fullname, profile, avatar, status, birthdate)
import * as fetchFunctions from "@/utils/fetch/fetch";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import { useAuth } from '../../../contexts/AuthContext';

const userProfile = () =>

  {
    
    const userData = Cookies.get("userData")
    // console.log(userData);
    const initialUserData = userData?JSON.parse(userData) : null
    // console.log(initialUserData.user);

    const [user, setUser] = useState({
      email: "",
      lastname: "",
      name: "",
      profile: "",
      avatar: "",
      status: "",
      birthdate: "",
    });
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [newAvatar, setNewAvatar] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [userImage, setuserImage] = useState('');
    const [userId, setuserId] = useState('');
    const [token, settoken] = useState('');

    useEffect(() => {
      if (initialUserData) {
        setuserId(initialUserData.user.id)
        settoken(initialUserData.token)
        setuserImage(initialUserData.user.avatar)
        const [lastname, name] = initialUserData.user.fullname.split(", ");
        // console.log(lastname, name);
        setUser((prevUser) => ({
          ...prevUser,
          email: initialUserData.user.email,
          lastname: lastname,
          name: name,
          profile: initialUserData.user.profile,
          avatar: initialUserData.user.avatar,
          status: initialUserData.user.status,
          birthdate: initialUserData.user.birthdate,
        }));
      }else{
        router.push(`/`)
      }
    }, []);

    const handleEditClick = () => {
      setIsEditing(true);
      // console.log(user)
    };

    const handleAvatarChange = async (e) => {
      e.preventDefault();

const array = userImage.split("/")
const [publicID, etc] = array[array.length-1].split(".")
console.log(publicID)
//borrar la imagen anterior ------------------------------------------------
const del = await fetchFunctions.DELETE(
  `https://c13-13-n-node-react-backend.onrender.com/users/eliminar-imagen/${publicID}`
  // `http://localhost:3001/users/eliminar-imagen/${publicID}`
);
console.log(del);
//-------------------------------------------------------------------------------

      const file = e.target.files[0]
      // console.log(file)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'TellMeChat')
      formData.append('api_key', 317454741746325);
      formData.append('public_id',`${publicID}`);
      setLoading(true)
      const res = await fetch('https://api.cloudinary.com/v1_1/TellMe/image/upload',
          {
              method: "POST",
              body: formData
          })
          // console.log('soy respuesta:',res);
          const cloudinaryData = await res.json();
          const uploadedUrl = cloudinaryData.secure_url
      // console.log('soy la url nueva',uploadedUrl)
      setLoading(false)
      setUser((prevUser) => ({
        ...prevUser,
        avatar: uploadedUrl,
      }));

      validateFields();
    };

    console.log('user fuera',user)
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({
        ...user,
        [name]: value,
      });
    };

    // console.log(user);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newFullname=`${user.lastname}, ${user.name}`
      const formToSend = {
        id:userId,
        email:user.email,
        role:"common", 
       fullname: newFullname,
       profile:"", 
       avatar:user.avatar,
       status:user.status,
       birthdate: user.birthdate
      }


      console.log('user en submit',formToSend)
      setLoading(true);
      const result = await fetchFunctions.PUT(
        "https://c13-13-n-node-react-backend.onrender.com/users",
        // "http://localhost:3001/users",
        formToSend
      ); 
      console.log(result);
        const newCookieData = {token: token, formToSend}
     Cookies.set("userData", JSON.stringify(newCookieData));

     
      window.location.reload();
      // console.log(newCookieData);

       setLoading(false);
      // id, email, role, fullname, profile, avatar, status, birthdate 
    };

    const validateFields = () => {
      const errors = {};
      // validación de cada campo
      if (!user.email.includes("@")) {
        errors.email = "Email must be valid";
      }
      setValidationErrors(errors);
      return Object.keys(errors).length === 0; // Retorna true si no hay errores
    };

    return (
      <div className="container mt-5">
        <b style={{ display: "flex" }}>
          {" "}
          <a
            className="nav-link btn btn-outline-primary"
            onClick={() => {
              router.push(`/auth/dashboard`);
            }}
          >
            <BsArrowLeft className="me-2" />
            Atrás
          </a>
        </b>
        <hr />
        {/* <h2>User profile:</h2> */}
        <form className="form" style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}> 
        <div style={{display: "flex", flexDirection: "row",alignContent: "center", width:"100%", justifyContent:"space-around",flexWrap:"wrap"}}>     
            <div className="datos" style={{ display: "flex", flexDirection: "column",alignContent:"center",flexWrap:"wrap" }}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className={`form-control ${
                    validationErrors.email && "is-invalid"
                  }`}
                  readOnly={!isEditing}
                />
                <div className="invalid-feedback">You must enter an email</div>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Lastname:
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status:
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={true}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">
                  Birthdate:
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={user.birthdate}
                  onChange={handleChange}
                  className="form-control"
                  readOnly={!isEditing}
                />
              </div>
            </div>


            <div className="imagen" style={{display:"flex", flexDirection:"column", flexWrap:"wrap", alignItems:"flex-start"}}>
        <div className="form-group">
          <label htmlFor="exampleInputAvatar" className="form-label mt-4">
            Imagen de perfil
          </label>
          {isEditing && <input
            type="file"
            className="form-control"
            id="exampleInputAvatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            required
          />}
        </div>
        {user.avatar?
(<div>
      <img src={user.avatar} alt="" style={{ width: "200px", height:"200px", marginTop:"10%" }}/>
    </div>): <img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693605320/NoCountry/no-product-image-400x400_1_ypw1vg.png" alt="" style={{ width: "200px", height:"200px", marginTop:"10%" }}/>
    }
    
    </div> 
           
         </div>
         {loading?(
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} ><img src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693864078/loading_..._hfexoy.gif" style={{ width: "110px", height:"110px"}} alt="cargando..." /></div> ):(<div>  
                {isEditing ? (
                  <div style={{ minWidth: "100%", display:"flex", justifyContent:"center" }}>
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                  
                    style={{ minWidth: "auto" }}
                  >
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ minWidth: "auto" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-warning me-2"
                      onClick={handleEditClick}
                      style={{ width: "auto" }}
                    >
                      Editar
                    </button>
                  </div>
                )}
                </div> )}
             
        </form>
      </div>
    );
  };

export default userProfile;
