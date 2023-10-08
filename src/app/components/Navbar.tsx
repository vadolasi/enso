"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useSession } from "next-auth/react"

const Navbar: React.FC = () => {
  const { status } = useSession()

  const [navbar, setNavbar] = useState(false)

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackground)

    return () =>  window.removeEventListener("scroll", changeBackground)
  }, [])

  const items = () => {
    return (
      <>
        <li><a href="#inicio">Ínicio</a></li>
        <li><a href="#funcionalidades">Funcionalidades</a></li>
        <li><a href="#funcionalidades">Preço</a></li>
      </>
    )
  }

  return (
    <header className={clsx("navbar bg-trasnparent fixed z-50 w-full transition-all ease-in-out duration-300", navbar && "shadow bg-base-300")}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {items()}
            {status === "authenticated" ? (
              <>
                <li><Link className="btn btn-sm" href="/home">Acessar plataforma</Link></li>
              </>
            ) : (
              <>
                <li><Link className="btn btn-sm btn-outline" href="/login">Entre</Link></li>
                <li><a className="btn btn-sm btn-primary">Cadastre-se</a></li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Enso</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex">
          {items()}
        </ul>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-1">
          {status === "authenticated" ? (
            <>
              <li><Link className="btn btn-sm btn-primary" href="/home">Acessar plataforma</Link></li>
            </>
          ) : (
            <>
              <li><Link className="border" href="/login">Entre</Link></li>
              <li><a className="bg-primary text-white border border-primary">Cadastre-se</a></li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
