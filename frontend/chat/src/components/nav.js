"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Nav(params) {

  const  router = useRouter()
    return (

        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/" >Chat</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={()=>{router.push(`/auth/login`)}}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={()=>{router.push(`/auth/register`)}}>Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={()=>{router.push(`/about`)}}>About Us</a>
              </li>

            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Search"/>
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
}