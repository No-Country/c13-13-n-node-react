"use client";

import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cargando, setICargando] = useState(false);

  const router = useRouter();


  async function handleSubmit() {
    event.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    setICargando(true)
    let result = await fetchFunctions.POST(
      "https://c13-13-n-node-react-backend.onrender.com/auth/login",
      data
    );
    setICargando(false)
    console.log(result);

    if (result.token) {
      setIsLoggedIn(true)
    } else {
      alert("Usuario o Password incorrecto")
    }

  }


  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      router.push("/auth/dashboard");
    } 
  
  }, [isLoggedIn]);

  return (
    <form className="contarinerGral" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmial(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {cargando && <p>cargando...</p>} {/* Mostrar mensaje de carga solo cuando cargando es true */}
      </fieldset>
    </form>
  );
}

// API Test made it with
// In this case was needed to send the next object called data:
// let data = {
//     title: email,
//     body: password,
//      userId: 1,}
//    let result = await fetchFunctions.POST('https://jsonplaceholder.typicode.com/posts', data)
