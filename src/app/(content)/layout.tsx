import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"
import logo from "./logo.png"
import Image from "next/image"
import Profile from "./components/Profile"

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-screen flex flex-col">
        <div className="navbar h-20 bg-base-100 border-b flex items-center">
          <div className="navbar-start">
            <Link href="/home" className="lg:hidden">
              <Image src={logo} alt="Enso" height={50} />
            </Link>
          </div>
          <div className="navbar-end">
            <Profile name={(session?.user as any)?.name} />
          </div>
        </div>
        <main className="flex items-center justify-center flex-1 h-full overflow-y-auto">
          {children}
          <label htmlFor="drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        </main>
      </div>
      <div className="drawer-side flex flex-col overflow-hidden">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <div className="h-20 bg-base-100 border-b hidden lg:flex items-center p-3">
          <Link href="/home">
            <Image src={logo} alt="Enso" height={50} />
          </Link>
        </div>
        <div className="bg-base-100 border-r h-full flex-1">
          <ul className="menu p-4 w-80 min-h-full text-base-content">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/">Questões</Link>
            </li>
            <li>
              <Link href="/desempenho">Desempenho</Link>
            </li>
            {(session?.user as any)?.cargo === "ADMINISTRADOR" && (
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Layout
