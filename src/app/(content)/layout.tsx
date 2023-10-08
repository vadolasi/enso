import Link from "next/link"
import React from "react"
import logo from "./logo.png"
import Image from "next/image"
import Profile from "./components/Profile"
import useAuth from "@/lib/useAuth"
import SidebarLinks from "../components/SidebarLinks"

const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const { name, cargo } = await useAuth()

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
            <Profile name={name!} className="hidden lg:block" />
            <label htmlFor="drawer" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
          </div>
        </div>
        <main className="flex flex-col items-center justify-center flex-1 h-full overflow-y-auto p-20">
          {children}
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
          <Profile name={name!} className="lg:hidden" />
          <SidebarLinks cargo={cargo!} />
        </div>
      </div>
    </div>
  )
}

export default Layout
