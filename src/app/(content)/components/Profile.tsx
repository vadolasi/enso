"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"
import { twMerge } from "tailwind-merge"

const Profile: React.FC<{ name: string, className?: string }> = ({ name, className }) => {
  return (
    <details className={twMerge("dropdown", className ?? "")}>
      <summary className="m-1 btn btn-outline rounded-full pl-1 px-2">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
            <span>MX</span>
          </div>
        </div>
        {name}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
        <li>
          <Link href="/perfil">
            <FaUserAlt />
            Perfil
          </Link>
        </li>
        <li>
          <button className="text-error" onClick={() => signOut()}>
            <FaSignOutAlt />
            Sair
          </button>
        </li>
      </ul>
    </details>
  )
}

export default Profile
