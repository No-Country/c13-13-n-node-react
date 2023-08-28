"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  return (
    <main className="contarinerGral">
      <h2>Proyecto CHAT</h2>
      <p>Unite al chat con tus amigos.</p>
      <p><small>Crea tu propia de chat.</small></p>

      <button type="button" class="btn btn-outline-dark" >
        <a className="nav-link" onClick={() => { router.push(`/auth/login`) }}>Login</a></button>
      <button type="button" class="btn btn-outline-dark">
        <a className="nav-link" onClick={() => { router.push(`/auth/register`) }}>Register</a></button>

    </main>
  )
}
