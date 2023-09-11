"use client";
import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";



export default function Nav(params) {
  const { user } = useAuth();
  // console.log(user);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const userData = Cookies.get("userData")
  const initialUserData = userData? JSON.parse(userData) : null

      useEffect(() => {
        if (initialUserData) {
          setCurrentUser(initialUserData);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      }, [user]);
      // console.log(initialUserData?.user.fullname);

  useEffect(() => {
    require("bootstrap");
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            alignItems: "center",
            color: "white",
            fontSize: "20px",
          }}
        >
          <Link className="navbar-brand" href="/">
            <img
              src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693015077/NoCountry/image_o8sh38.png"
              alt="Logo"
              width="60"
              padding-left="20px"
              height="60"
              className="d-inline-block align-center"
              style={{ marginLeft: "15%" }}
            />
          </Link>
          <div
            style={{
              color: "white",
              marginLeft: "5px",
              fontSize: "1.8rem",
              fontFamily: "'Lobster Two', cursive",
            }}
          >
            Tell me
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
        >
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>

      <div
        className="collapse navbar-collapse"
        id="navbarColor01"
        style={{
          width: "30%",
        }}
      >
        {!isAuthenticated? (<ul
          className="navbar-nav me-auto"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignContent:"center",
            textAlign: "center",
          }}
        >
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                router.push(`/auth/login`);
              }}
            >
              Login
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={() => {
                router.push(`/auth/register`);
              }}
            >
              Register
            </a>
          </li>
          
          <li className="nav-item">
           <a
              className="nav-link"
              onClick={() => {
                router.push(`/about`);
              }}

            >
              About Us
            </a>
          </li>
          <li className="nav-item" >
          <img
          src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693665338/NoCountry/PineTools.com_usuario_no_registrado_hi0lcz.png"
          alt="logged out"
          width="30px"
          padding-left="20px"
          height="30px"
          // className="d-inline-block align-center"
          // style={{ marginLeft: "35%" }}
          />
          </li>
        </ul>):(
          <ul
          className="navbar-nav me-auto"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignContent: "center",
            textAlign: "center",
          }}
        >

        <li className="nav-item">
           <a
              className="nav-link"
              onClick={() => {
                router.push(`/about`);
              }}
            >
              About Us
            </a>
          </li>
          <li className="nav-item">
           <a 
              className="nav-link"
              onClick={() => {
                router.push("/auth/dashboard");
              }}
            >
              {currentUser.user.fullname}
            </a>
          </li>
        <li>
         <img
          src={currentUser.user.avatar}
          alt="logged in"
          style={{borderRadius:"50%", border:"2px solid white", marginLeft:"10px"}}
          width="45px"
          // padding-left="20px"
          className="d-inline-block align-center"
          // style={{ marginLeft: "35%" }}
          />
          </li>
          </ul>   
        )}
      </div>
    </nav> 
  );
}
