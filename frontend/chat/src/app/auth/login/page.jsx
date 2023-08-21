"use client"
import * as fetchFunctions from "@/utils/fetch/fetch";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Login() {
  const [email,setEmial] = useState("")
  const [password,setPassword] = useState("")

  const  router = useRouter()

    async function handleSubmit() {
      event.preventDefault();
      let data = { 
         email: email,
        password: password
      }
    let result = await fetchFunctions.POST("URL", data)
  // API Test made it with 
  // In this case was needed to send the next object called data:
  // let data = {
  //     title: email,
  //     body: password,
  //      userId: 1,}
  //    let result = await fetchFunctions.POST('https://jsonplaceholder.typicode.com/posts', data)
router.push(`/auth/dashboard`)
    }
  
    return(  
    <form className="contarinerGral" onSubmit={handleSubmit}>
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