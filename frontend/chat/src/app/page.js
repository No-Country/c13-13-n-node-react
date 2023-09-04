"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  return (
    <main className="contarinerGral">
      <br></br>
      <h2 >Proyecto Tell me</h2>
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
          src="https://res.cloudinary.com/dbwmesg3e/image/upload/v1693743322/NoCountry/Unete_con_tus_amigos_final_hnmrrd.gif"
          alt="GIF"
          width="300"
          height="auto"
        />
      </div>
      {!user ? (<div style={{ display: "flex", flexDirection: "column", marginTop: "2% " }}>
        <button
          type="button"
          className="btn btn-outline-primary"
          style={{ marginBottom: "5px" }}
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
        <button type="button" className="btn btn-outline-primary" style={{ marginBottom: "5px" }}>
          <a
            className="nav-link"
            onClick={() => {
              router.push(`/auth/register`);
            }}

          >
            Register
          </a>
        </button>
      </div>) : <div></div>
      }

    </main>
  );
}
