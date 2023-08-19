"use client"
import { useRouter } from "next/navigation"

export default function Nav(params) {

  const  router = useRouter()
    return (

        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" onClick={()=>{router.push(`/`)}}>Chat</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link" onClick={()=>{router.push(`/auth/login`)}}>Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={()=>{router.push(`/auth/register`)}}>Register</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={()=>{router.push(`/about`)}}>About Us</a>
              </li>

            </ul>
            <form class="d-flex">
              <input class="form-control me-sm-2" type="search" placeholder="Search"/>
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}