"use client";
//(id, email, role, fullname, profile, avatar, status, birthdate)
import * as fetchFunctions from "@/utils/fetch/fetch";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

const userProfile = () =>

  {
    const userData = Cookies.get("userData")
    const initialUserData = JSON.parse(userData)
    console.log(initialUserData);
   

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
    // console.log(user)

    useEffect(() => {
      if (initialUserData) {
 

        setUser((prevUser) => ({
          ...prevUser,
          email: initialUserData.user.email,
          profile: initialUserData.user.profile,
          avatar: initialUserData.user.avatar,
          status: initialUserData.user.status,
    
        }));
      }
    }, []);

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleChange = (e) => {
      validateFields();
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
        <form className="form" style={{alignContent: "center"}} onSubmit={handleSubmit}>      
            <div className="datos" >
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

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "column",alignContent:"center",flexWrap:"wrap" }}
            >
              <label htmlFor="avatar" className="form-label">
                Avatar :
              </label>
              {isEditing ? (
                <>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleAvatarChange}
                    className="form-control mb-2"
                  />
                  {newAvatar && (
                    <img src={newAvatar} alt="New Avatar" className="mb-2" />
                  )}
                </>
              ) : (
                <img className="avatar" src={user.avatar} alt="Avatar" />
              )}
            </div>
         
             <div>  
                {isEditing ? (
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                  
                    style={{ minWidth: "auto" }}
                  >
                    Guardar Cambios
                  </button>
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
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ minWidth: "auto" }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}
                </div> 
        </form>
      </div>
    );
  };

export default userProfile;
