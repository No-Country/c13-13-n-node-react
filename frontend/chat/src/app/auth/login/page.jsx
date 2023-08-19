"use client"

import { useState } from "react";

export default function Login() {
  const [email,setEmial] = useState("")
  const [password,setPassword] = useState("")



  function handleSubmit() {
    event.preventDefault();
    alert(email +" "+ password)    
  }
    return(  
    <form onSubmit={handleSubmit}>
    <fieldset>
    <legend>Login</legend>

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