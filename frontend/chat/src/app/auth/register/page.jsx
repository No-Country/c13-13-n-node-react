"use client"

import { useState } from "react";

export default function Register() {
  const [email,setEmial] = useState("")
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [lastName,setLastName] = useState("")



  function handleSubmit() {
    event.preventDefault();
    alert(email +" "+ password + " " + name +" "+ lastName)    
  }
    return(  
    <form onSubmit={handleSubmit}>
    <fieldset>
    <legend>Registrate</legend>

    <div className="form-group">    
    <label htmlFor="exampleInputEmail1" className="form-label mt-4">Nombre</label>
      <input 
        type="text" 
        className="form-control" 
        id="exampleInputname1" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-describedby="nameHelp" 
        placeholder="Enter name"/>
    </div>

    <div className="form-group">    
    <label htmlFor="exampleInputEmail1" className="form-label mt-4">Apellido</label>
      <input 
        type="text" 
        className="form-control" 
        id="exampleInputlastName1" 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        aria-describedby="lastNameHelp" 
        placeholder="Enter lastName"/>
    </div>

    <div className="form-group">    
    <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
      <input 
        type="email" 
        className="form-control" 
        id="exampleInputEmail1" 
        value={email}
        onChange={(e) => setEmial(e.target.value)}
        aria-describedby="emailHelp" 
        placeholder="Enter email"/>
    </div>
    
    <div className="form-group">
    <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
      <input 
        type="password" 
        className="form-control" 
        id="exampleInputPassword1"
        value={password} 
        onChange={(e)=> { setPassword(e.target.value)}}
        placeholder="Password" 
        autoComplete="off"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </fieldset>
</form>
     
        
    )
}