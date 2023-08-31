"use client";
//(id, email, role, fullname, profile, avatar, status, birthdate)
import * as fetchFunctions from "@/utils/fetch/fetch";
import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.css';
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";



const userProfile = ( 
  // {initialUserData} 
  ) => {
 const initialUserData={
  id: 1,
  email: "javierpedernera@gmail.com",
  role: "admin",
  fullname: "Pedernera, Javier",
  profile: "perfil de usuario",
  avatar: "https://cdn-icons-png.flaticon.com/512/1995/1995515.png",
  status: "active",
  passwordToken: "$2b$10$5WhhhtPllQich50HURkpmON7QyFJq/Gdl5EDTkkxy5f3RIsXGycmi",
  birthdate: "2023-08-25",
  Rooms: [ ]
}

  const [user, setUser] = useState({
    email: '',
    lastname: '',
    name: '',
    profile: '',
    avatar: '',
    status: '',
    birthdate: '',
  });
  const router = useRouter()
const [isEditing, setIsEditing] = useState(false);
const [newAvatar, setNewAvatar] = useState(null);
const [validationErrors, setValidationErrors] = useState({})
// console.log(user)

// useEffect(() => {
//   if (initialUserData) {
//     const [lastname, name] = initialUserData.fullname.split(', ');
//     // console.log(lastname, name);
//     setUser((prevUser) => ({
//       ...prevUser,
//       email: initialUserData.email,
//       lastname: lastname,
//       name: name,
//       profile: initialUserData.profile,
//     avatar: initialUserData.avatar,
//     status: initialUserData.status,
//     birthdate: initialUserData.birthdate,
//     }));
//   }
// }, []);

const handleEditClick = () => {
  setIsEditing(true);
};

  const handleChange = (e) => {
    validateFields()
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Logica para hacer el PUT en la base de datos, recordar unir lastname, name.
    // if (!validateFields()) {
    //   return;
    // }
    // console.log('Datos del usuario modificados:', user);
  };

  const validateFields = () => {
    const errors = {};
    // validación de cada campo
    if (!user.email.includes('@')) {
      errors.email = 'Email must be valid';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Retorna true si no hay errores
  };

  return (
    <div className="container mt-5">
      <b style={{display:"flex"}}> <a className="nav-link btn btn-outline-primary" onClick={() => { router.push(`/auth/dashboard`) }} >
      <BsArrowLeft className="me-2" />
       Atrás
      </a></b>
      <hr />
      {/* <h2>User profile:</h2> */}
      <form className="form" onSubmit={handleSubmit}>
      <div className="data-img">
        <div className="datos" style={{marginRight:"5rem"}}>
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
            className={`form-control ${validationErrors.email && 'is-invalid'}`}
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
            readOnly="true"
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
        
        <div className="mb-3" style={{display:"flex", flexDirection:"column"}}>
          <label htmlFor="avatar" className="form-label" >
            Avatar (Image):
          </label >
          {isEditing ? (
            <>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleAvatarChange}
                className="form-control mb-2"
              />
              {newAvatar && <img src={newAvatar} alt="New Avatar" className="mb-2" />}
            </>
          ) : (
            <img className="avatar" src={user.avatar} alt="Avatar" />
          )}
        </div>
        </div>
        {/* Agregar más campos aquí */}
        {isEditing ? (
          <button type="submit" className="btn btn-primary me-2" disabled={true}>
            Save Changes
          </button>
        ) : (
          <div style={{width:"100%", display:"flex",justifyContent:"center"}}><button
            type="button"
            className="btn btn-warning me-2"
            onClick={handleEditClick}
            style={{width:"20%"}}
          >
            Edit
          </button></div>
          
        )}
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default userProfile;