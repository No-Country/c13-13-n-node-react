"use client";

import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { serialize } from "cookie";

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
    setICargando(true);
    let dataResponse = await fetchFunctions.POST(
      "https://c13-13-n-node-react-backend.onrender.com/auth/login",
      data
    );

    setICargando(false);

    if (dataResponse.token) {
      document.cookie = serialize("userData", JSON.stringify(dataResponse));
 
      setIsLoggedIn(true);
    } else {
      alert("Usuario o Password incorrecto");
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/auth/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <form className="contarinerGral" onSubmit={handleSubmit} style={{marginTop:"20px"}}>
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
        <button type="submit" className="btn btn-primary"style={{marginTop:"20px"}}>
          Submit
        </button>
        
        {cargando && <p>cargando...</p>}
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
