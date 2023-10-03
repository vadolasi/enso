"use client"

import { signOut } from "next-auth/react"

const Profile: React.FC<{ name: string }> = ({ name }) => {
  return (
    <details className="dropdown">
      <summary className="m-1 btn btn-outline rounded-full">{name}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
        <li><a>Perfil</a></li>
        <li><button onClick={() => signOut()}>Sair</button></li>
      </ul>
    </details>
  )
}

export default Profile
