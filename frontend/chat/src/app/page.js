"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="contarinerGral">
      <br></br>
      <h2>Proyecto Tell me</h2>
      {/* <p>Unite al chat con tus amigos.</p>
      <p><small>Crea tu propia sala de chat.</small></p> */}
      <div className="alert alert-info">
        <div className="container">
          <p>
            Bienvenido al Proyecto Tell me, una plataforma emocionante que te
            permite conectarte y comunicarte con amigos y personas de todo el
            mundo. Únete a conversaciones interesantes, comparte ideas y crea
            nuevas amistades en un entorno divertido y seguro.
          </p>
        </div>
      </div>
      <div
        className="gif-container"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <img
          src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693187366/NoCountry/Unete_con_tus_amigos_rvz1ns.gif"
          alt="GIF"
          width="300" // Ajusta el ancho deseado
          height="auto"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button
          type="button"
          className="btn btn-outline-dark"
          style={{ marginBottom: "15px" }}
        >
          <a
            className="nav-link"
            onClick={() => {
              router.push(`/auth/login`);
            }}
          >
            Login
          </a>
        </button>
        <button type="button" className="btn btn-outline-dark">
          <a
            className="nav-link"
            onClick={() => {
              router.push(`/auth/register`);
            }}
          >
            Register
          </a>
        </button>
      </div>
    </main>
  );
}
