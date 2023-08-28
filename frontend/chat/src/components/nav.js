"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Nav(params) {
  const router = useRouter();
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
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
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
